enchant();

var Calendar_datas = [];

function Game_load(width,height){
  var core = new Core(width,height);
  core.fps = 30;
  core.onload = function(){
    var StartScene = function(){
       var scene = new Scene();

       var Image = [];
       var Image_length;
       var Image_datas = {
         width:width,
         height:height,
         url:"カレンダー枠.png"
       };
       Images(Image_datas);

       var Text = [];
       var Text_length;
       var Text_datas = {
         x:10,
         y:10,
         カラー:"",
         フォント:"60px monospace"
       };


       var Monday = new Date();

       switch (new Date().getDay()){
         case 0:
            Monday.setDate(Monday.getDate() - 6);
            break;
         case 1:
            break;
         case 2:
         case 3:
         case 4:
         case 5:
         case 6:
            Monday.setDate(Monday.getDate() - new Date().getDay() + 1);
            break;
       };
       console.log(Monday);

       Text_datas.テキスト = "現在開発中" + new Date().getFullYear() + "年度 " + (new Date().getMonth() + 1) + "月";
       Texts(Text_datas);

       for(var I = 0; I < Calendar_datas.length; I++){
         Text_datas.y += 120;
         if(Calendar_datas[I][2]==true) Text_datas.テキスト = Calendar_datas[I][1];
         else Text_datas.テキスト = Calendar_datas[I][0].slice(11,-3) + " " + Calendar_datas[I][1];
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
