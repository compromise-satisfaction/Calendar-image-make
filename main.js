enchant();

var Calendar_datas = [];

function Game_load(width,height){
  var core = new Core(width,height);
  core.fps = 30;
  core.onload = function(){
    var StartScene = function(){
       var scene = new Scene();

       var Now = new Date();
       var Monday = new Date(Now);

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

       Text_datas.テキスト = new Date(Now).getFullYear() + "年 " + (new Date(Now).getMonth() + 1) + "月 開発中";
       Texts(Text_datas);

       var Days_texts = "月火水木金土日";
       Text_datas.フォント = "100px monospace";
       Text_datas.x = 0;
       Text_datas.y = 100;

       for(var I = 0; I < Days_texts.length; I++){
         Text_datas.テキスト = Days_texts[I];
         switch (Text_datas.テキスト) {
           case "土":
            Text_datas.カラー = "blue";
            break;
           case "日":
            Text_datas.カラー = "red";
            break;
         };
         Texts(Text_datas);
         Text_datas.x += 100;
       };

       Text_datas.フォント = "20px monospace";
       Text_datas.カラー = "black";
       Text_datas.x = 10;
       Text_datas.y = 210;

       Monday.setDate(1);

       Days_texts = [];

       var Last_month = new Date(Monday);
       Last_month.setDate(2 - Monday.getDay());

       for(var I = 0; I < Monday.getDay(); I++){
         Days_texts[Days_texts.length] = new Date(Last_month);
         Last_month.setDate(Last_month.getDate() + 1);
       };

       Monday.setDate(2);

       while(Monday.getDate()!=1){
         Days_texts[Days_texts.length] = new Date(Monday);
         Monday.setDate(Monday.getDate()+1);
       };

       for(var I = Days_texts.length; I < 35; I++){
         Days_texts[Days_texts.length] = new Date(Monday);
         Monday.setDate(Monday.getDate()+1);
       };

       var B_A = true;

       Text_datas.透明度 = 0.2;

       var Text_Day_datas = {
         フォント:"20px monospace"
       };

       for(var I = 0; I < Days_texts.length; I++){
         if(B_A){
           if(Days_texts[I].getDate()==1){
             Text_datas.透明度 = 1;
             B_A = false;
           };
         }
         else{
           for(var J = 0; J < Calendar_datas.length; J++){
             Text_Day_datas.x = Text_datas.x;
             Text_Day_datas.y = Text_datas.y + 10;
             if(new Date(Calendar_datas[J][0]).getDate()==Days_texts[I].getDate()){
               Text_Day_datas.y += 20;
               Text_Day_datas.テキスト = Calendar_datas[J][1];
               if(Calendar_datas[J][2]!="現在時刻") Text_Day_datas.カラー = "black";
               else{
                 Text_Day_datas.カラー = "green";
                 Text_Day_datas.テキスト = "今日";
               };
               Texts(Text_Day_datas);
             };
           };
           if(Days_texts[I].getDate()==new Date(Now).getDate()) Text_datas.カラー = "green";
           else Text_datas.カラー = "black";
           if(Days_texts[I].getDate()==1){
             Text_datas.透明度 = 0.2;
           };
         };
         if(I%7==6&&Text_datas.カラー!="green") Text_datas.カラー = "red";
         Text_datas.テキスト = Days_texts[I].getDate();
         Texts(Text_datas);
         Text_datas.x += 100;
         if(I%7==6){
           Text_datas.x = 10;
           Text_datas.y += 100;
         };
       };

       function Texts(Datas){
         Text_length = Text.length;
         Text[Text_length] = new Sprite();
         Text[Text_length]._element = document.createElement("innerHTML");
         Text[Text_length]._style.font  = Datas.フォント;
         Text[Text_length]._element.textContent = Datas.テキスト;
         Text[Text_length]._style.color = Datas.カラー;
         Text[Text_length].x = Datas.x;
         Text[Text_length].y = Datas.y;
         Text[Text_length].opacity = Datas.透明度;
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
