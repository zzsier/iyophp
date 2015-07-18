
(function () {

    var URL = window.UEDITOR_HOME_URL || getUEBasePath();

    /**
     * ���������塣ע�⣬�˴������漰��·�������ñ���©URL������
     */
    window.UEDITOR_CONFIG = {

        //Ϊ�༭��ʵ�����һ��·����������ܱ�ע��
        UEDITOR_HOME_URL: URL

        // ������ͳһ����ӿ�·��
        //, serverUrl: URL + "php/controller.php"

        ,toolbars : [['bold','forecolor','link']]
        ,theme:'detail'
        ,themePath:URL +"themes/"

        ,zIndex : 10     //�༭���㼶�Ļ���,Ĭ����900

        ,initialStyle:'p{font-size:14px;font-family:Microsoft YaHei}'//�༭���㼶�Ļ���,���������ı������

        ,initialFrameWidth:960  //��ʼ���༭�����,Ĭ��1000
        ,initialFrameHeight:107  //��ʼ���༭���߶�,Ĭ��320

        ,autoTransWordToList:false  //��ֹword��ճ���������б��Զ�����б��ǩ

        ,elementPathEnabled : false

        ,wordCount:false          //�Ƿ�������ͳ��
        ,scaleEnabled:true
		,autoFloatEnabled:false
    };

    function getUEBasePath(docUrl, confUrl) {

        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());

    }

    function getConfigFilePath() {

        var configPath = document.getElementsByTagName('script');

        return configPath[ configPath.length - 1 ].src;

    }

    function getBasePath(docUrl, confUrl) {

        var basePath = confUrl;


        if (/^(\/|\\\\)/.test(confUrl)) {

            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');

        } else if (!/^[a-z]+:/i.test(confUrl)) {

            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');

            basePath = docUrl + "" + confUrl;

        }

        return optimizationPath(basePath);

    }

    function optimizationPath(path) {

        var protocol = /^[a-z]+:\/\//.exec(path)[ 0 ],
            tmp = null,
            res = [];

        path = path.replace(protocol, "").split("?")[0].split("#")[0];

        path = path.replace(/\\/g, '/').split(/\//);

        path[ path.length - 1 ] = "";

        while (path.length) {

            if (( tmp = path.shift() ) === "..") {
                res.pop();
            } else if (tmp !== ".") {
                res.push(tmp);
            }

        }

        return protocol + res.join("/");

    }

    window.UE = {
        getUEBasePath: getUEBasePath
    };

})();
