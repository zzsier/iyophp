
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
},0,4);


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
},0,5);



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
},0,6);


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
},0,7);
