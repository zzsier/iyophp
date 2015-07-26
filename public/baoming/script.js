var tabUl,tabNavLi, tabCon,tabNum;
var part1_data,part2_data,part3_data,part4_data,remarketing_data;
var way;
var report;
window.onload=function()
{
    tabUl = document.getElementById("intel-tab");
    // tab对象
    tabNavLi= [];
    for(var n=0;n<4;n++)
    {
        tabNavLi.push(tabUl.getElementsByTagName("li")[n]);
    }
    // tab 内容
    tabCon	= [];
    tabNum	= 4;
    for(var i=1; i<=tabNum; i++){
        tabCon.push(document.getElementById("tab-intel-"+i));
    }
    // 悬浮切换
    for(var i=0; i<4; i++){
        // 应用js闭包传入参数i作为当前索引值赋值给m
        (function(m){
            tabNavLi[m].onmouseover = function(){
                showTab(m);
            }
        })(i);	
    }
    
     if (Enabler.isInitialized()) {
          enablerInitHandler();
      } else {
          Enabler.addEventListener(studio.events.StudioEvent.INIT,
    enablerInitHandler);
      }
}

function enablerInitHandler() {
    way = new WAY();
     Enabler.setProfileId(1042993);
    var devDynamicContent = {};

    devDynamicContent.Zol_smartzone_biz= [{},{},{},{},{},{},{},{}];
    devDynamicContent.Zol_smartzone_biz[0]._id = 0;
    devDynamicContent.Zol_smartzone_biz[0].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_biz[0].Tab_SLOT_1 = "biz";
    devDynamicContent.Zol_smartzone_biz[0].Note = "\u6280\u672F";
    devDynamicContent.Zol_smartzone_biz[0].T_SLOT_1 = "\u6A2A\u5411\u53EF\u6269\u5C55\u5B58\u50A82\uFF1A\u4E86\u89E3\u6570\u636E\u4E2D\u5FC3\u5B58\u50A8\u7ED3\u6784\u4F53\u7CFB\u7684\u7ED3\u6784\u53D8\u5316";
    devDynamicContent.Zol_smartzone_biz[0].Picture_URL = {};
    devDynamicContent.Zol_smartzone_biz[0].Picture_URL.Url = "http://picd.zol-img.com.cn/2015/03/1425242484.jpg";
    devDynamicContent.Zol_smartzone_biz[0].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_biz[0].URL_SLOT_1.Url = "http://www.intel.cn/content/www/cn/zh/cloud-computing/14098-arch-changes-chs-360p.html";
    devDynamicContent.Zol_smartzone_biz[0].Describution = "\u7EA2\u8272\u7248\u6234\u5C14Venue 8 Pro\u5728\u5916\u89C2\u4E0A\u8FD8\u662F\u7ED9\u672C\u6B21\u8BC4\u6D4B\u5E26\u6765\u4E00\u4E1D...";
    devDynamicContent.Zol_smartzone_biz[0].Active = true;
    devDynamicContent.Zol_smartzone_biz[1].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_biz[1].Tab_SLOT_1 = "biz";
    devDynamicContent.Zol_smartzone_biz[1].Note = "\u6280\u672F";
    devDynamicContent.Zol_smartzone_biz[1].T_SLOT_1 = "\u6A2A\u5411\u53EF\u6269\u5C55\u5B58\u50A82\uFF1A\u4E86\u89E3\u6570\u636E\u4E2D\u5FC3\u5B58\u50A8\u7ED3\u6784\u4F53\u7CFB\u7684\u7ED3\u6784\u53D8\u5316";
    devDynamicContent.Zol_smartzone_biz[1].Picture_URL = {};
    devDynamicContent.Zol_smartzone_biz[1].Picture_URL.Url = "http://picd.zol-img.com.cn/2015/03/1425242484.jpg";
    devDynamicContent.Zol_smartzone_biz[1].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_biz[1].URL_SLOT_1.Url = "http://www.intel.cn/content/www/cn/zh/cloud-computing/14098-arch-changes-chs-360p.html";
    devDynamicContent.Zol_smartzone_biz[1].Describution = "\u7EA2\u8272\u7248\u6234\u5C14Venue 8 Pro\u5728\u5916\u89C2\u4E0A\u8FD8\u662F\u7ED9\u672C\u6B21\u8BC4\u6D4B\u5E26\u6765\u4E00\u4E1D...";
    devDynamicContent.Zol_smartzone_biz[1].Active = true;
    devDynamicContent.Zol_smartzone_biz[2].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_biz[2].Tab_SLOT_1 = "biz";
    devDynamicContent.Zol_smartzone_biz[2].Note = "\u6280\u672F";
    devDynamicContent.Zol_smartzone_biz[2].T_SLOT_1 = "\u6A2A\u5411\u53EF\u6269\u5C55\u5B58\u50A82\uFF1A\u4E86\u89E3\u6570\u636E\u4E2D\u5FC3\u5B58\u50A8\u7ED3\u6784\u4F53\u7CFB\u7684\u7ED3\u6784\u53D8\u5316";
    devDynamicContent.Zol_smartzone_biz[2].Picture_URL = {};
    devDynamicContent.Zol_smartzone_biz[2].Picture_URL.Url = "http://picd.zol-img.com.cn/2015/03/1425242484.jpg";
    devDynamicContent.Zol_smartzone_biz[2].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_biz[2].URL_SLOT_1.Url = "http://www.intel.cn/content/www/cn/zh/cloud-computing/14098-arch-changes-chs-360p.html";
    devDynamicContent.Zol_smartzone_biz[2].Describution = "\u7EA2\u8272\u7248\u6234\u5C14Venue 8 Pro\u5728\u5916\u89C2\u4E0A\u8FD8\u662F\u7ED9\u672C\u6B21\u8BC4\u6D4B\u5E26\u6765\u4E00\u4E1D...";
    devDynamicContent.Zol_smartzone_biz[2].Active = true;
    devDynamicContent.Zol_smartzone_biz[3].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_biz[3].Tab_SLOT_1 = "biz";
    devDynamicContent.Zol_smartzone_biz[3].Note = "\u6280\u672F";
    devDynamicContent.Zol_smartzone_biz[3].T_SLOT_1 = "\u6A2A\u5411\u53EF\u6269\u5C55\u5B58\u50A82\uFF1A\u4E86\u89E3\u6570\u636E\u4E2D\u5FC3\u5B58\u50A8\u7ED3\u6784\u4F53\u7CFB\u7684\u7ED3\u6784\u53D8\u5316";
    devDynamicContent.Zol_smartzone_biz[3].Picture_URL = {};
    devDynamicContent.Zol_smartzone_biz[3].Picture_URL.Url = "http://picd.zol-img.com.cn/2015/03/1425242484.jpg";
    devDynamicContent.Zol_smartzone_biz[3].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_biz[3].URL_SLOT_1.Url = "http://www.intel.cn/content/www/cn/zh/cloud-computing/14098-arch-changes-chs-360p.html";
    devDynamicContent.Zol_smartzone_biz[3].Describution = "\u7EA2\u8272\u7248\u6234\u5C14Venue 8 Pro\u5728\u5916\u89C2\u4E0A\u8FD8\u662F\u7ED9\u672C\u6B21\u8BC4\u6D4B\u5E26\u6765\u4E00\u4E1D...";
    devDynamicContent.Zol_smartzone_biz[3].Active = true;
    devDynamicContent.Zol_smartzone_biz[4].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_biz[4].Tab_SLOT_1 = "biz";
    devDynamicContent.Zol_smartzone_biz[4].Note = "\u6280\u672F";
    devDynamicContent.Zol_smartzone_biz[4].T_SLOT_1 = "\u6A2A\u5411\u53EF\u6269\u5C55\u5B58\u50A82\uFF1A\u4E86\u89E3\u6570\u636E\u4E2D\u5FC3\u5B58\u50A8\u7ED3\u6784\u4F53\u7CFB\u7684\u7ED3\u6784\u53D8\u5316";
    devDynamicContent.Zol_smartzone_biz[4].Picture_URL = {};
    devDynamicContent.Zol_smartzone_biz[4].Picture_URL.Url = "http://picd.zol-img.com.cn/2015/03/1425242484.jpg";
    devDynamicContent.Zol_smartzone_biz[4].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_biz[4].URL_SLOT_1.Url = "http://www.intel.cn/content/www/cn/zh/cloud-computing/14098-arch-changes-chs-360p.html";
    devDynamicContent.Zol_smartzone_biz[4].Describution = "\u7EA2\u8272\u7248\u6234\u5C14Venue 8 Pro\u5728\u5916\u89C2\u4E0A\u8FD8\u662F\u7ED9\u672C\u6B21\u8BC4\u6D4B\u5E26\u6765\u4E00\u4E1D...";
    devDynamicContent.Zol_smartzone_biz[4].Active = true;
    devDynamicContent.Zol_smartzone_biz[5].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_biz[5].Tab_SLOT_1 = "biz";
    devDynamicContent.Zol_smartzone_biz[5].Note = "\u6280\u672F";
    devDynamicContent.Zol_smartzone_biz[5].T_SLOT_1 = "\u6A2A\u5411\u53EF\u6269\u5C55\u5B58\u50A82\uFF1A\u4E86\u89E3\u6570\u636E\u4E2D\u5FC3\u5B58\u50A8\u7ED3\u6784\u4F53\u7CFB\u7684\u7ED3\u6784\u53D8\u5316";
    devDynamicContent.Zol_smartzone_biz[5].Picture_URL = {};
    devDynamicContent.Zol_smartzone_biz[5].Picture_URL.Url = "http://picd.zol-img.com.cn/2015/03/1425242484.jpg";
    devDynamicContent.Zol_smartzone_biz[5].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_biz[5].URL_SLOT_1.Url = "http://www.intel.cn/content/www/cn/zh/cloud-computing/14098-arch-changes-chs-360p.html";
    devDynamicContent.Zol_smartzone_biz[5].Describution = "\u7EA2\u8272\u7248\u6234\u5C14Venue 8 Pro\u5728\u5916\u89C2\u4E0A\u8FD8\u662F\u7ED9\u672C\u6B21\u8BC4\u6D4B\u5E26\u6765\u4E00\u4E1D...";
    devDynamicContent.Zol_smartzone_biz[5].Active = true;
    devDynamicContent.Zol_smartzone_biz[6].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_biz[6].Tab_SLOT_1 = "biz";
    devDynamicContent.Zol_smartzone_biz[6].Note = "\u6280\u672F";
    devDynamicContent.Zol_smartzone_biz[6].T_SLOT_1 = "\u6A2A\u5411\u53EF\u6269\u5C55\u5B58\u50A82\uFF1A\u4E86\u89E3\u6570\u636E\u4E2D\u5FC3\u5B58\u50A8\u7ED3\u6784\u4F53\u7CFB\u7684\u7ED3\u6784\u53D8\u5316";
    devDynamicContent.Zol_smartzone_biz[6].Picture_URL = {};
    devDynamicContent.Zol_smartzone_biz[6].Picture_URL.Url = "http://picd.zol-img.com.cn/2015/03/1425242484.jpg";
    devDynamicContent.Zol_smartzone_biz[6].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_biz[6].URL_SLOT_1.Url = "http://www.intel.cn/content/www/cn/zh/cloud-computing/14098-arch-changes-chs-360p.html";
    devDynamicContent.Zol_smartzone_biz[6].Describution = "\u7EA2\u8272\u7248\u6234\u5C14Venue 8 Pro\u5728\u5916\u89C2\u4E0A\u8FD8\u662F\u7ED9\u672C\u6B21\u8BC4\u6D4B\u5E26\u6765\u4E00\u4E1D...";
    devDynamicContent.Zol_smartzone_biz[6].Active = true;
    devDynamicContent.Zol_smartzone_biz[7].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_biz[7].Tab_SLOT_1 = "biz";
    devDynamicContent.Zol_smartzone_biz[7].Note = "\u6280\u672F";
    devDynamicContent.Zol_smartzone_biz[7].T_SLOT_1 = "\u6A2A\u5411\u53EF\u6269\u5C55\u5B58\u50A82\uFF1A\u4E86\u89E3\u6570\u636E\u4E2D\u5FC3\u5B58\u50A8\u7ED3\u6784\u4F53\u7CFB\u7684\u7ED3\u6784\u53D8\u5316";
    devDynamicContent.Zol_smartzone_biz[7].Picture_URL = {};
    devDynamicContent.Zol_smartzone_biz[7].Picture_URL.Url = "http://picd.zol-img.com.cn/2015/03/1425242484.jpg";
    devDynamicContent.Zol_smartzone_biz[7].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_biz[7].URL_SLOT_1.Url = "http://www.intel.cn/content/www/cn/zh/cloud-computing/14098-arch-changes-chs-360p.html";
    devDynamicContent.Zol_smartzone_biz[7].Describution = "\u7EA2\u8272\u7248\u6234\u5C14Venue 8 Pro\u5728\u5916\u89C2\u4E0A\u8FD8\u662F\u7ED9\u672C\u6B21\u8BC4\u6D4B\u5E26\u6765\u4E00\u4E1D...";
    devDynamicContent.Zol_smartzone_biz[7].Active = true;
    devDynamicContent.Zol_smartzone_remarketing= [{}];
    devDynamicContent.Zol_smartzone_remarketing[0]._id = 0;
    devDynamicContent.Zol_smartzone_remarketing[0].ID = 1;
    devDynamicContent.Zol_smartzone_remarketing[0].Tab = "content";
    devDynamicContent.Zol_smartzone_remarketing[0].Default = false;
    devDynamicContent.Zol_smartzone_content= [{},{},{},{},{}];
    devDynamicContent.Zol_smartzone_content[0]._id = 0;
    devDynamicContent.Zol_smartzone_content[0].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_content[0].Tab_SLOT_1 = "con";
    devDynamicContent.Zol_smartzone_content[0].Tab_SLOT_2 = "Content";
    devDynamicContent.Zol_smartzone_content[0].FormFactor_Id = 10001;
    devDynamicContent.Zol_smartzone_content[0].T_SLOT_1 = "\u4F4E\u8C03\u4E2D\u7684\u738B\u8005\n \u2014 HP ZBook 17 \u5168\u65B0\u4E00\u4EE3\u79FB\u52A8\u5DE5\u4F5C\u7AD9";
    devDynamicContent.Zol_smartzone_content[0].Picture_URL = {};
    devDynamicContent.Zol_smartzone_content[0].Picture_URL.Url = "http://img.dgtle.com/portal/201401/02/170212jvx38x45dv0fqt45.jpg";
    devDynamicContent.Zol_smartzone_content[0].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_content[0].URL_SLOT_1.Url = "http://news.zol.com.cn/509/5099454.html";
    devDynamicContent.Zol_smartzone_content[0].Active = true;
    devDynamicContent.Zol_smartzone_content[1].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_content[1].Tab_SLOT_1 = "con";
    devDynamicContent.Zol_smartzone_content[1].Tab_SLOT_2 = "Content";
    devDynamicContent.Zol_smartzone_content[1].FormFactor_Id = 10001;
    devDynamicContent.Zol_smartzone_content[1].T_SLOT_1 = "\u4F4E\u8C03\u4E2D\u7684\u738B\u8005\n \u2014 HP ZBook 17 \u5168\u65B0\u4E00\u4EE3\u79FB\u52A8\u5DE5\u4F5C\u7AD9";
    devDynamicContent.Zol_smartzone_content[1].Picture_URL = {};
    devDynamicContent.Zol_smartzone_content[1].Picture_URL.Url = "http://img.dgtle.com/portal/201401/02/170212jvx38x45dv0fqt45.jpg";
    devDynamicContent.Zol_smartzone_content[1].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_content[1].URL_SLOT_1.Url = "http://news.zol.com.cn/509/5099454.html";
    devDynamicContent.Zol_smartzone_content[1].Active = true;
    devDynamicContent.Zol_smartzone_content[2].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_content[2].Tab_SLOT_1 = "con";
    devDynamicContent.Zol_smartzone_content[2].Tab_SLOT_2 = "Content";
    devDynamicContent.Zol_smartzone_content[2].FormFactor_Id = 10001;
    devDynamicContent.Zol_smartzone_content[2].T_SLOT_1 = "\u4F4E\u8C03\u4E2D\u7684\u738B\u8005\n \u2014 HP ZBook 17 \u5168\u65B0\u4E00\u4EE3\u79FB\u52A8\u5DE5\u4F5C\u7AD9";
    devDynamicContent.Zol_smartzone_content[2].Picture_URL = {};
    devDynamicContent.Zol_smartzone_content[2].Picture_URL.Url = "http://img.dgtle.com/portal/201401/02/170212jvx38x45dv0fqt45.jpg";
    devDynamicContent.Zol_smartzone_content[2].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_content[2].URL_SLOT_1.Url = "http://news.zol.com.cn/509/5099454.html";
    devDynamicContent.Zol_smartzone_content[2].Active = true;
    devDynamicContent.Zol_smartzone_content[3].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_content[3].Tab_SLOT_1 = "con";
    devDynamicContent.Zol_smartzone_content[3].Tab_SLOT_2 = "Content";
    devDynamicContent.Zol_smartzone_content[3].FormFactor_Id = 10001;
    devDynamicContent.Zol_smartzone_content[3].T_SLOT_1 = "\u4F4E\u8C03\u4E2D\u7684\u738B\u8005\n \u2014 HP ZBook 17 \u5168\u65B0\u4E00\u4EE3\u79FB\u52A8\u5DE5\u4F5C\u7AD9";
    devDynamicContent.Zol_smartzone_content[3].Picture_URL = {};
    devDynamicContent.Zol_smartzone_content[3].Picture_URL.Url = "http://img.dgtle.com/portal/201401/02/170212jvx38x45dv0fqt45.jpg";
    devDynamicContent.Zol_smartzone_content[3].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_content[3].URL_SLOT_1.Url = "http://news.zol.com.cn/509/5099454.html";
    devDynamicContent.Zol_smartzone_content[3].Active = true;
    devDynamicContent.Zol_smartzone_content[4].Unique_ID = 1;
    devDynamicContent.Zol_smartzone_content[4].Tab_SLOT_1 = "con";
    devDynamicContent.Zol_smartzone_content[4].Tab_SLOT_2 = "Content";
    devDynamicContent.Zol_smartzone_content[4].FormFactor_Id = 10001;
    devDynamicContent.Zol_smartzone_content[4].T_SLOT_1 = "\u4F4E\u8C03\u4E2D\u7684\u738B\u8005\n \u2014 HP ZBook 17 \u5168\u65B0\u4E00\u4EE3\u79FB\u52A8\u5DE5\u4F5C\u7AD9";
    devDynamicContent.Zol_smartzone_content[4].Picture_URL = {};
    devDynamicContent.Zol_smartzone_content[4].Picture_URL.Url = "http://img.dgtle.com/portal/201401/02/170212jvx38x45dv0fqt45.jpg";
    devDynamicContent.Zol_smartzone_content[4].URL_SLOT_1 = {};
    devDynamicContent.Zol_smartzone_content[4].URL_SLOT_1.Url = "http://news.zol.com.cn/509/5099454.html";
    devDynamicContent.Zol_smartzone_content[4].Active = true;
    devDynamicContent.Zol_smartzone_Zol_product= [{}];
    devDynamicContent.Zol_smartzone_Zol_product[0]._id = 0;
    devDynamicContent.Zol_smartzone_Zol_product[0].Id = 1;
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct1_image = {};
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct1_image.Url = "http://2c.zol-img.com.cn/product_small/4_80x60/812/ce2JKdsHqbXY.jpg";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct1_text = "\u8054\u60F3Yoga11S-ITH\uFF08\u65E5\u5149\u6A59\uFF09";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct1_link = {};
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct1_link.Url = "http://detail.zol.com.cn/ultrabook/index344443.shtml";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct1_price = 4200;
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct2_text = "\u534E\u7855TX300K3317CA";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct2_link = {};
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct2_link.Url = "http://detail.zol.com.cn/ultrabook/index354282.shtml";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct2_price = 6800;
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct3_text = "ThinkPad S1 Yoga\uFF0820CDS000";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct3_link = {};
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct3_link.Url = "http://detail.zol.com.cn/ultrabook/index365631.shtml";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct3_price = 8400;
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct4_text = "\u6234\u5C14XPS 12\uFF08XPS12D-5708\uFF09";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct4_link = {};
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct4_link.Url = "http://detail.zol.com.cn/ultrabook/index366144.shtml";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct4_price = 13000;
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct5_text = "Acer P3-171-3322Y2G06as";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct5_link = {};
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct5_link.Url = "http://detail.zol.com.cn/ultrabook/index352914.shtml";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct5_price = 3200;
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct6_text = "\u60E0\u666EPavilion 11-n015tu x36";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct6_link = {};
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct6_link.Url = "http://detail.zol.com.cn/notebook/index371820.shtml?smt_b=C0B0A0908070605230DF70C";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct6_price = 3199;
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct7_text = "\u7D22\u5C3CF11N15SCP\uFF08\u7C89\uFF09";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct7_link = {};
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct7_link.Url = "http://detail.zol.com.cn/ultrabook/index369106.shtml";
    devDynamicContent.Zol_smartzone_Zol_product[0].procuct7_price = 5999;
    devDynamicContent.Zol_smartzone_Zol_product[0].isDefault = true;
    devDynamicContent.Zol_smartzone_Zol_promotion= [{}];
    devDynamicContent.Zol_smartzone_Zol_promotion[0]._id = 0;
    devDynamicContent.Zol_smartzone_Zol_promotion[0].Id = 1;
    devDynamicContent.Zol_smartzone_Zol_promotion[0].photo = {};
    devDynamicContent.Zol_smartzone_Zol_promotion[0].photo.Url = "http://icon.zol-img.com.cn/nb/other/intel1.jpg";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].photo_link = {};
    devDynamicContent.Zol_smartzone_Zol_promotion[0].photo_link.Url = "http://www.taobao.com/market/try/intel.php";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line1_text = "\u4E00\u8D77\u6740\u654C Intel\/\u817E\u8BAF\u8054\u5408\u63A8\u4F7F\u547D\u53EC\u5524OL";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line1_link = {};
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line1_link.Url = "http://cpu.zol.com.cn/479/4792871.html";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line2_text = "\u9AD8\u6E05\u89E6\u63A7\u7F51\u8D2D\u66F4\u723D 2\u54081\u7535\u8111\u8BA9\u4F60\u4E0D\u4E00\u6837";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line2_link = {};
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line2_link.Url = "http://nb.zol.com.cn/477/4770844.html";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line3_text = "\u5165\u95E8\u6E38\u620F\u795E\u5668 \u5954\u817EG3258\u6E38\u620F\u6027\u80FD\u6D4B\u8BD5";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line3_link = {};
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line3_link.Url = "http://cpu.zol.com.cn/479/4796670.html";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line4_text = "\u6D41\u7545\u5C31\u8981\u9177\u777F \u300A\u4F7F\u547D\u53EC\u5524OL\u300B\u914D\u7F6E\u6307\u5357";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line4_link = {};
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line4_link.Url = "http://cpu.zol.com.cn/497/4975266.html";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line5_text = "\u5148\u8FDB\u67B6\u6784\u6027\u80FD\u7206\u68DA BroadWell\u5904\u7406\u5668\u6E38\u620F\u5B9E\u6D4B";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line5_link = {};
    devDynamicContent.Zol_smartzone_Zol_promotion[0].line5_link.Url = "http://nb.zol.com.cn/502/5025492.html";
    devDynamicContent.Zol_smartzone_Zol_promotion[0].isDefault = true;
    Enabler.setDevDynamicContent(devDynamicContent);
    
    part1_data = dynamicContent.Zol_smartzone_content;
    part2_data = dynamicContent.Zol_smartzone_Zol_promotion[0];
    part3_data = dynamicContent.Zol_smartzone_Zol_product[0];
    part4_data = dynamicContent.Zol_smartzone_biz;
    
    initDisplay();
    
    triggerFls(part1_data[0].FormFactor_Id);
    
    //content,product,promotion,biz,default
    remarketing_data = dynamicContent.Zol_smartzone_remarketing[0].Tab;
    
    
    //set random tab
    // for(var i = 20; i >= 0; i--)
    // {
        // tabUl.insertBefore(tabNavLi[parseInt(Math.random() * 4)],tabNavLi[parseInt(Math.random() * 4)]);
    // }
    
    //var tabsFromPage = ["con","promotion","product","biz"];
   // var tabFromPage = parent.parent.DCAD_CurrentTab || parent.DCAD_CurrentTab;
   // var currentTabNum = tabsFromPage.indexOf(tabFromPage);
   // if(currentTabNum == -1) currentTabNum = 0;
    var currentTabNum = parseInt(Math.random() * 4);;
    switch(remarketing_data)
    {
        case 'content':
            currentTabNum = 0;
            break;   
        case 'promotion':
            currentTabNum = 1;
            break;
        case 'product':
            currentTabNum = 2;
            break;
        case 'biz':
            currentTabNum = 3;
            break;  
        default:
            getTabFromParent();
            break;
    }
    
    showTab(currentTabNum);
}

function getTabFromParent()
{
    window.parent.postMessage(1, '*');
  //  console.log("Post From Child");
    
    if (typeof window.addEventListener != 'undefined') {
    window.addEventListener('message', getParam, false);
} else if (typeof window.attachEvent != 'undefined') {
    window.attachEvent('onmessage', getParam);
}
}

function getParam(e)
{
    try{
        var tabsFromPage = ["con","promotion","product","biz"];
        var tabFromPage = e.data;
       // console.log("FromParent:" + e.data);
        var currentTabNum = tabsFromPage.indexOf(tabFromPage);
        if(currentTabNum != -1)
        {
            showTab(currentTabNum);
        }
    }catch(e){return;}
}


function showTab(i)
{
     for(var j=0; j<tabNum; j++){
        var obj 	 = tabNavLi[j];
        if(j==i){
            obj.className = j==0 ?  'first current' : 'current';
        }else{
            obj.className = j==0 ?  'first' : '';
        }
        
        tabCon[j].style.display = (j==i) ? "block" : "none";
    }
}

function initDisplay()
{
    way.set("part1_image", part1_data[0].Picture_URL.Url);
    way.set('part1_line1', part1_data[0].T_SLOT_1);
    way.set('part1_line2', part1_data[1].T_SLOT_1);
    way.set('part1_line3', part1_data[2].T_SLOT_1);
    way.set('part1_line4', part1_data[3].T_SLOT_1);
    way.set('part1_line5', part1_data[4].T_SLOT_1);
    
    way.set("part2_image", part2_data.photo.Url);
    way.set('part2_line1', part2_data.line1_text);
    way.set('part2_line2', part2_data.line2_text);
    way.set('part2_line3', part2_data.line3_text);
    way.set('part2_line4', part2_data.line4_text);
    way.set('part2_line5', part2_data.line5_text);
    
    way.set("part3_image", part3_data.procuct1_image.Url);
    way.set('part3_line1', part3_data.procuct1_text);
    way.set('part3_line2', part3_data.procuct2_text);
    way.set('part3_line3', part3_data.procuct3_text);
    way.set('part3_line4', part3_data.procuct4_text);
    way.set('part3_line5', part3_data.procuct5_text);
    way.set('part3_line6', part3_data.procuct6_text);
    way.set('part3_line7', part3_data.procuct7_text);
    way.set('part3_line1_price', "￥" + part3_data.procuct1_price);
    way.set('part3_line2_price', "￥" + part3_data.procuct2_price);
    way.set('part3_line3_price', "￥" + part3_data.procuct3_price);
    way.set('part3_line4_price', "￥" + part3_data.procuct4_price);
    way.set('part3_line5_price', "￥" + part3_data.procuct5_price);
    way.set('part3_line6_price', "￥" + part3_data.procuct6_price);
    way.set('part3_line7_price', "￥" + part3_data.procuct7_price);
    
    way.set("part4_image", part4_data[0].Picture_URL.Url);
    way.set("part4_line1_description", part4_data[0].Describution + '<a href="javascript:void(0);" class="more" id="part4_more">[全文]</a>');
    way.set('part4_line1', part4_data[0].T_SLOT_1);
    way.set('part4_line2', part4_data[1].T_SLOT_1);
    way.set('part4_line3', part4_data[2].T_SLOT_1);
    way.set('part4_line4', part4_data[3].T_SLOT_1);
    way.set('part4_line5', part4_data[4].T_SLOT_1);
    way.set('part4_line6', part4_data[5].T_SLOT_1);
    way.set('part4_line7', part4_data[6].T_SLOT_1);
    way.set('part4_line8', part4_data[7].T_SLOT_1);
    
    initExits();
}

function initExits()
{
    var clickElements = ['part1_image_exit','part1_line1_exit','part1_line2_exit','part1_line3_exit','part1_line4_exit','part1_line5_exit',
                         'part2_image_exit','part2_line1_exit','part2_line2_exit','part2_line3_exit','part2_line4_exit','part2_line5_exit',
                         'part3_image_exit','part3_line1_exit','part3_line2_exit','part3_line3_exit','part3_line4_exit','part3_line5_exit','part3_line6_exit','part3_line7_exit',
                         'part4_image_exit','part4_more','part4_line1_exit','part4_line2_exit','part4_line3_exit','part4_line4_exit','part4_line5_exit','part4_line6_exit','part4_line7_exit','part4_line8_exit'];
    var exitsNum = clickElements.length;
    for(i=0;i<exitsNum;i++)
    {
        var ele = document.getElementById(clickElements[i]);
        //console.log(i);
        if(window.addEventListener)
        {
            if(window.ontouchend)
            {
                ele.addEventListener('touchend', setExits(i));
            }
            else
            {
                ele.addEventListener('click', setExits(i));
            }
           

        }
        else if(window.attachEvent)
        {
            ele.attachEvent("onclick", setExits(i));
        }

    }                     

}

function setExits(ele)
{
    return function()
    {
        switch(ele)
        {
            case 0:
                Enabler.exitOverride('part1_image_exit', part1_data[0].URL_SLOT_1.Url);
                report = "CON " + part1_data[0].Unique_ID + " Image";
                break;
            case 1:
                Enabler.exitOverride('part1_line1_exit', part1_data[0].URL_SLOT_1.Url);
                report = "CON " + part1_data[0].Unique_ID;
                break;
            case 2:
                Enabler.exitOverride('part1_line2_exit', part1_data[1].URL_SLOT_1.Url);
                report = "CON " + part1_data[1].Unique_ID;
                break;
            case 3:
                Enabler.exitOverride('part1_line3_exit', part1_data[2].URL_SLOT_1.Url);
                report = "CON " + part1_data[2].Unique_ID;
                break;
            case 4:
                Enabler.exitOverride('part1_line4_exit', part1_data[3].URL_SLOT_1.Url);
                report = "CON " + part1_data[3].Unique_ID;
                break;
            case 5:
                Enabler.exitOverride('part1_line5_exit', part1_data[4].URL_SLOT_1.Url);
                report = "CON " + part1_data[4].Unique_ID;
                break;
            case 6:
                Enabler.exitOverride('part2_image_exit', part2_data.photo_link.Url);
                report = "Promotion " + part2_data.Id + " Image";
                break;
            case 7:
                Enabler.exitOverride('part2_line1_exit', part2_data.line1_link.Url);
                report = "Promotion " + part2_data.Id + " Line1";
                break;
            case 8:
                Enabler.exitOverride('part2_line2_exit', part2_data.line2_link.Url);
                report = "Promotion " + part2_data.Id + " Line2";
                break;
            case 9:
                Enabler.exitOverride('part2_line3_exit', part2_data.line3_link.Url);
                report = "Promotion " + part2_data.Id + " Line3";
                break;
            case 10:
                Enabler.exitOverride('part2_line4_exit', part2_data.line4_link.Url);
                report = "Promotion " + part2_data.Id + " Line4";
                break;
            case 11:
                Enabler.exitOverride('part2_line5_exit', part2_data.line5_link.Url);
                report = "Promotion " + part2_data.Id + " Line5";
                break;
            case 12:
                Enabler.exitOverride('part3_image_exit', part3_data.procuct1_link.Url);
                report = "Product " + part3_data.Id + " Image";
                break;
            case 13:
                Enabler.exitOverride('part3_line1_exit', part3_data.procuct1_link.Url);
                report = "Product " + part3_data.Id + " line1";
                break;
            case 14:
                Enabler.exitOverride('part3_line2_exit', part3_data.procuct2_link.Url);
                report = "Product " + part3_data.Id + " line2";
                break;
            case 15:
                Enabler.exitOverride('part3_line3_exit', part3_data.procuct3_link.Url);
                report = "Product " + part3_data.Id + " line3";
                break;
            case 16:
                Enabler.exitOverride('part3_line4_exit', part3_data.procuct4_link.Url);
                report = "Product " + part3_data.Id + " line4";
                break;
            case 17:
                Enabler.exitOverride('part3_line5_exit', part3_data.procuct5_link.Url);
                report = "Product " + part3_data.Id + " line5";
                break;
            case 18:
                Enabler.exitOverride('part3_line6_exit', part3_data.procuct6_link.Url);
                report = "Product " + part3_data.Id + " line6";
                break;
            case 19:
                Enabler.exitOverride('part3_line7_exit', part3_data.procuct7_link.Url);
                report = "Product " + part3_data.Id + " line7";
                break;
            case 20:
                Enabler.exitOverride('part4_image_exit', part4_data[0].URL_SLOT_1.Url);
                report = "Biz " + part4_data[0].Unique_ID + " Image";
                break;
            case 21:
                Enabler.exitOverride('part4_more', part4_data[0].URL_SLOT_1.Url);
                report = "Biz " + part4_data[0].Unique_ID + " More";
                break;
            case 22:
                Enabler.exitOverride('part4_line1_exit', part4_data[0].URL_SLOT_1.Url);
                report = "Biz " + part4_data[0].Unique_ID;
                break;
            case 23:
                Enabler.exitOverride('part4_line2_exit', part4_data[1].URL_SLOT_1.Url);
                report = "Biz " + part4_data[1].Unique_ID;
                break;
            case 24:
                Enabler.exitOverride('part4_line3_exit', part4_data[2].URL_SLOT_1.Url);
                report = "Biz " + part4_data[2].Unique_ID;
                break;
            case 25:
                Enabler.exitOverride('part4_line4_exit', part4_data[3].URL_SLOT_1.Url);
                report = "Biz " + part4_data[3].Unique_ID;
                break;
            case 26:
                Enabler.exitOverride('part4_line5_exit', part4_data[4].URL_SLOT_1.Url);
                report = "Biz " + part4_data[4].Unique_ID;
                break;
            case 27:
                Enabler.exitOverride('part4_line6_exit', part4_data[5].URL_SLOT_1.Url);
                report = "Biz " + part4_data[5].Unique_ID;
                break;
            case 28:
                Enabler.exitOverride('part4_line7_exit', part4_data[6].URL_SLOT_1.Url);
                report = "Biz " + part4_data[6].Unique_ID;
                break;
            case 29:
                Enabler.exitOverride('part4_line8_exit', part4_data[7].URL_SLOT_1.Url);
                report = "Biz " + part4_data[7].Unique_ID;
                break;  
        }
        
        if(report)
        {
            Enabler.reportCustomVariableCount2(report);
        }
        
        if(ele < 6)
        {
            triggerFls(101);
            
        }else if(ele < 12)
        {
            triggerFls(103);
            
        }else if(ele < 20)
        {
            triggerFls(102);
        }
        else
        {
            triggerFls(104);
        }
    }
    
   
}

//trigger floodlight tag
function triggerFls(u)
{
    var FL_smartzone = "http://2218289.fls.doubleclick.net/activityi;src=2218289;type=2015dycr;cat=2015d00;u1=";
    var FL_homepage = "http://2218289.fls.doubleclick.net/activityi;src=2218289;type=2015dycr;cat=2015d0;u1=";
    if (document.getElementById("DCLK_FLDiv"))
    {
        var flDiv = document.getElementById("DCLK_FLDiv"); 
    }
    else { 
        var flDiv = document.body.appendChild(document.createElement("div"));
        flDiv.id="DCLK_FLDiv"; 
        flDiv.style.display = "none"; 
    }

    var DCLK_FLIframe = document.createElement("iframe"); 
    DCLK_FLIframe.id = "DCLK_FLIframe_9012";
    DCLK_FLIframe.src = (u > 1000 ? FL_homepage : FL_smartzone) + u + ";ord=1;num=" + new Date()*1;
    flDiv.appendChild(DCLK_FLIframe);
}