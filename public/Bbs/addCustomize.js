//����
UE.registerUI('zolemotion', function(editor, uiName) {
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName, {
        execCommand: function() {
			FB.showEmotion();
        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name: uiName,
        //��ʾ
        title: '�������',
        //��Ӷ�����ʽ,ָ��iconͼ��,����Ĭ��ʹ��һ���ظ���icon
        //cssRules: 'class:',
        //���ʱִ�е�����
        onclick: function() {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
            editor.execCommand(uiName);
        }
    });
    //���㵽�༭������ʱ����ťҪ����״̬����
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //��Ϊ�������button,������Ҫ�������button
    return btn;
},0,9);

//ע�ḽ��
UE.registerUI('zolattachment', function(editor, uiName) {
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName, {
        execCommand: function() {
			FB.showAttachment();
			swfUpload.uploadAttachArea = $('#attachUploadArea'); //�����ϴ�����
            //alert('execCommand:' + uiName)
        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name: uiName,
        //��ʾ
        title: '�ϴ�����',
        //��Ӷ�����ʽ,ָ��iconͼ��,����Ĭ��ʹ��һ���ظ���icon
        //cssRules: 'class:',
        //���ʱִ�е�����
        onclick: function() {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
            editor.execCommand(uiName);
        }
    });
    //���㵽�༭������ʱ����ťҪ����״̬����
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //��Ϊ�������button,������Ҫ�������button
    return btn;
},0,10);

//������Ƶ
UE.registerUI('zolinsertvideo', function(editor, uiName) {
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName, {
        execCommand: function() {
			FB.showVideo();
        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name: uiName,
        //��ʾ
        title: '������Ƶ',
        //��Ӷ�����ʽ,ָ��iconͼ��,����Ĭ��ʹ��һ���ظ���icon
        //cssRules: 'class:',
        //���ʱִ�е�����
        onclick: function() {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
            editor.execCommand(uiName);
        }
    });
    //���㵽�༭������ʱ����ťҪ����״̬����
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //��Ϊ�������button,������Ҫ�������button
    return btn;
},0,11);

UE.registerUI('inserthidden', function(editor, uiName) {
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName, {
        execCommand: function() {
			FB.insertHidden();
        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name: uiName,
        //��ʾ
        title: '�ظ��ɼ�',
        //��Ӷ�����ʽ,ָ��iconͼ��,����Ĭ��ʹ��һ���ظ���icon
        //cssRules: 'background-position: -500px 0;',
        //���ʱִ�е�����
        onclick: function() {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
            editor.execCommand(uiName);
        }
    });
    //���㵽�༭������ʱ����ťҪ����״̬����
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //��Ϊ�������button,������Ҫ�������button
    return btn;
},0,12);
/*
UE.registerUI('sample', function(editor, uiName) {
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName, {
        execCommand: function() {
            alert('execCommand:' + uiName)
        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name: uiName,
        //��ʾ
        title: uiName,
        //��Ӷ�����ʽ,ָ��iconͼ��,����Ĭ��ʹ��һ���ظ���icon
        cssRules: 'background-position: -500px 0;',
        //���ʱִ�е�����
        onclick: function() {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
            editor.execCommand(uiName);
        }
    });
    //���㵽�༭������ʱ����ťҪ����״̬����
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //��Ϊ�������button,������Ҫ�������button
    return btn;
});*/

//ע������
UE.registerUI('zolblockquote', function(editor, uiName) {
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName, {
        execCommand: function() {
			FB.showBlockquote();
        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name: uiName,
        //��ʾ
        title: '��������',
        //��Ӷ�����ʽ,ָ��iconͼ��,����Ĭ��ʹ��һ���ظ���icon
        //cssRules: 'class:',
        //���ʱִ�е�����
        onclick: function() {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
            editor.execCommand(uiName);
        }
    });
    //���㵽�༭������ʱ����ťҪ����״̬����
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //��Ϊ�������button,������Ҫ�������button
    return btn;
},1,12);

//�������
UE.registerUI('zolinsertcode', function(editor, uiName) {
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName, {
        execCommand: function() {
			FB.showCode();
            //alert('execCommand:' + uiName)
        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name: uiName,
        //��ʾ
        title: '�������',
        //���ʱִ�е�����
        onclick: function() {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
            editor.execCommand(uiName);
        }
    });
    //���㵽�༭������ʱ����ťҪ����״̬����
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //��Ϊ�������button,������Ҫ�������button
    return btn;
},1,13);

/*
UE.registerUI('wordformat', function(editor, uiName) {
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName, {
        execCommand: function() {
			FB.showWordformat();
            //alert('execCommand:' + uiName)
        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name: uiName,
        //��ʾ
        title: '��Wordճ������',
        //��Ӷ�����ʽ,ָ��iconͼ��,����Ĭ��ʹ��һ���ظ���icon
        //cssRules: 'background-position: -500px 0;',
        //���ʱִ�е�����
        onclick: function() {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
            editor.execCommand(uiName);
        }
    });
    //���㵽�༭������ʱ����ťҪ����״̬����
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //��Ϊ�������button,������Ҫ�������button
    return btn;
},1,14);
*/

UE.registerUI('atuser', function(editor, uiName) {
    //ע�ᰴťִ��ʱ��command���ʹ������Ĭ�Ͼͻ���л��˲���
    editor.registerCommand(uiName, {
        execCommand: function() {
            FB.atUser();
        }
    });
    //����һ��button
    var btn = new UE.ui.Button({
        //��ť������
        name: uiName,
        //��ʾ
        title: '@����',
        //��Ӷ�����ʽ,ָ��iconͼ��,����Ĭ��ʹ��һ���ظ���icon
        //cssRules: 'background-position: -500px 0;',
        //���ʱִ�е�����
        onclick: function() {
            //������Բ���ִ������,�����Լ��Ĳ���Ҳ��
            editor.execCommand(uiName);
        }
    });
    //���㵽�༭������ʱ����ťҪ����״̬����
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //��Ϊ�������button,������Ҫ�������button
    return btn;
},1,16);