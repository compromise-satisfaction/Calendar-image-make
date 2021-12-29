enchant();

var Calendar_datas = [];

function Game_load(width,height){
  var core = new Core(width, height);
  core.fps = 30;
  core.onload = function(){
    var StartScene = function(){
       var scene = new Scene();

       var Image_datas = {
         width:900,
         height:1600,
         url:"カレンダー枠.png"
       };

       var Text_datas = {
         x:0,
         y:0,
         カラー:"",
         フォント:"30px monospace"
       };

       var Image = [];
       var Image_length;

       Images(Image_datas);

       var Text = [];
       var Text_length;

       for(var I = 0; I < Calendar_datas.length; I++){
         Text_datas.y = I*60;
         Text_datas.テキスト = Calendar_datas[I][0] + " " + Calendar_datas[I][1];
         Texts(Text_datas);
       };

       function Texts(Datas){
         Text_length = Text.length;
         Text[Text_length] = new Sprite();
         Text[Text_length]._element = document.createElement("innerHTML");
         Text[Text_length]._style.font  = Datas.フォント;
         Text[Text_length]._element.textContent = Datas.テキスト;
         Text[Text_length]._element.color = Datas.カラー;
         Text[Text_length].x = Datas.x;
         Text[Text_length].y = Datas.y;
         scene.addChild(Text[Text_length]);
       };

       function Images(Datas){
         Image_length = Image.length;
         Image[Image_length] = new Sprite();
         Image[Image_length]._element = document.createElement("img");
         Image[Image_length]._element.src = Datas.url;
         Image[Image_length].width = Datas.width;
         Image[Image_length].height = Datas.height;
         Image[Image_length].x = Datas.x;
         Image[Image_length].y = Datas.y;
         Image[Image_length].rotation = Datas.回転;
         scene.addChild(Image[Image_length]);
         return;
       };

       return scene;
    };

    var URL = "https://script.google.com/macros/s/AKfycbwi6ekqJT9R4EB4hcX5bJ-UwZ_1SMYVVwRCsA6VAZxhVGmx--cV/exec";
    var Body = {
      タイプ:"カレンダー",
      カレンダー:"fvridgd2ud4qfhh1l2e0cv3pvc@group.calendar.google.com",
      ID:"田中家"
    };
    var Options = {
      method: "POST",
      body:JSON.stringify(Body)
    };
    fetch(URL,Options).then(res => res.json()).then(result => {
      for(var I = 0; I < result.length; I++){
        Calendar_datas[I] = result[I];
      };
      core.replaceScene(StartScene());
      return;
    },);
  }
  core.start();
};
