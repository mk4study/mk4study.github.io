/** 
* [summary] �^�u�y�[�W�̐؂�ւ����s��
* [param]   tabName        �^�u��
*           tabPageName    �\������^�u�y�[�W��
* [date]    2011/06/17
**/
function tabPageChange(tabName, tabPageName) {
    /* ���ׂẴ^�u�y�[�W���\���ɂ��� */
    for (var i = 0; i < tabName.length; i++) {
        document.getElementById(tabName[i]).style.display = "none";
        document.getElementById(tabName[i].concat('_tab')).className = '';
    }

    /* �w�肳�ꂽ�^�u�y�[�W��\���ɐݒ肷�� */
    document.getElementById(tabPageName).style.display = "block";
    document.getElementById(tabPageName.concat('_tab')).className = 'selected';
}

/** 
* [summary] �m�[�h�̓W�J���ꂽ��ԂƐ܂肽���܂ꂽ��Ԃ̐؂�ւ�
* [param]   e       �C�x���g
* [date]    2011/06/20
**/
function nodeToggle(e) {
    e = e || (window.event || {});
    var el, tgt = e.srcElement || e.target;
    if (tgt && (el = tgt.getElementsByTagName('ul').item(0)))
        el.className = 'therenowhere'.replace(el.className, '');
}


/** 
* [summary] �e�[�u���̌������s��
* [param]   tableName      �e�[�u����
* [date]    2011/06/21
**/
function searchTable(tableName) {
    // �e�[�u���̍s�����������s��
    for (var i = 1; i < tableName.rows.length; i++) {
        // �\������Ă��Ȃ��ꍇ�A�\�����s��
        if (tableName.rows[i].style.display == "none") {
            tableName.rows[i].style.display = '';
        }
    }
}

/**
* [summary] �|�b�v�A�b�v�𒆉��ŊJ��
* [param]   docName     �h�L�������g��
* [param]   width       ��
* [param]   height      ����
* [param]   resizable   �T�C�Y�ύX
* [date]    2011/08/19
**/
function openWinCenter(docName, width, height, resizable) {
    // �|�b�v�A�b�v��\������x���W
    x = (screen.width - width) / 2;
    // �|�b�v�A�b�v��\������y���W
    y = (screen.height - height) / 2;

    window.open(docName, '', "left=" + x + ",top=" + y + ",width=" + width + ",height=" + height + ",resizable=" + resizable+ ", scrollbars = yes");
}

/**
* [summary] xml��ǂݍ���
* [param]   xmlPath       �t�@�C���p�X
**/
function readXml(xmlPath) {
    try {
        // xml�I�u�W�F�N�g����
        obXml = new ActiveXObject('microsoft.XMLDOM');
        // ��������
        obXml.async = false;
        // xml�ǂݍ���
        obXml.load(xmlPath);
        // ���[�g�m�[�h�Q��
        rNode = obXml.documentElement;
        // �q�m�[�h
        cNode = rNode.childNodes;
        // �S�Ă̎q�m�[�h����������
        for (var i = 0; i < cNode.length; i++) {
            // �^�O���擾(TEXTBOX,TABLE�Ȃ�)
            cName = cNode.item(i).nodeName;

            switch (cName) {
                case null:
                case "comment":
                    break;
                case "TEXTBOX":
                    setValueTextBox(cNode.item(i));
                    break;
                case "TABLE":
                    setValueTable(cNode.item(i));
                    break;
                default:
                    break;
            }
        }
    } catch (e) {
        alert(e);
    }
}


/**
* [summary] �e�L�X�g�{�b�N�X�ɒl���Z�b�g
* [param]   nodeList       �m�[�h
**/
function setValueTextBox(nodeList) {
    // �^�OID�擾
    id = nodeList.getAttribute("ID");
    // �o�̓f�[�^���擾
    data = nodeList.getAttribute("VALUE");
    // �e�L�X�g�{�b�N�X�ɒl���Z�b�g
    document.getElementById(id).value = data;
}

/**
* [summary] �e�[�u���ɒl���Z�b�g
* [param]   nodeList       �m�[�h
**/
function setValueTable(nodeList) {
    // �^�OID�擾(TABLE�^�O��ID)
    id = nodeList.getAttribute("ID");
    // TABLE�̃G�������g�擾
    table = document.getElementById(id);
    // �q�m�[�h�擾
    cNodeList = nodeList.childNodes;
    // ���݂̍s���擾
    rowCount = table.rows.length;
    // ���݂̃Z�����擾
    colCount = table.rows[0].cells.length;
    // �s��ǉ�
    row = table.insertRow(rowCount);
    // �Z���̐����J��Ԃ�
    for (var j = 0; j < colCount; j++) {
        var cell = row.insertCell(j);
        cell.innerText = cNodeList.item(j).text;
    }
}

/**
* [summary] ��ʂ̏����ݒ���s��
* [param]   xmlPath       �t�@�C���p�X
**/
function initScreen(xmlPath) {
    try {
        // xml�I�u�W�F�N�g����
        obXml = new ActiveXObject('microsoft.XMLDOM');
        // ��������
        obXml.async = false;
        // xml�ǂݍ���
        obXml.load(xmlPath);
        // ���[�g�m�[�h�Q��
        rNode = obXml.documentElement;
        // �q�m�[�h
        cNode = rNode.childNodes;
        // �S�Ă̎q�m�[�h����������
        for (var i = 0; i < cNode.length; i++) {
            // �^�O���擾
            cName = cNode.item(i).nodeName;

            switch (cName) {
                case null:
                case "#comment":
                case "TABCONTROL":
                    break;
                case "COMBOBOX":
                case "LISTBOX":
                    setInsObj(cNode.item(i));
                    break;
                case "CHECKBOX":
                case "RADIOBUTTON":
                    setValueObj(cNode.item(i));
                    break;
                default:
                    break;
            }
        }
    } catch (e) {
        alert(e);
    }
}

/**
* [summary] �R���{�{�b�N�X�E���X�g�{�b�N�X�ɃA�C�e�����Z�b�g
* [param]   nodeList       �m�[�h
**/
function setInsObj(nodeList) {
    // �^�OID�擾(COMBOBOX�^�O��ID)
    id = nodeList.getAttribute("ID");
    // COMBOBOX�̃G�������g�擾
    obj = document.getElementById(id);
    // �G�������g���Ȃ��ꍇ�������I������
    if (obj == null) {
        return;
    }
    // �q�m�[�h�擾
    cNodeList = nodeList.childNodes;
    // �I�u�W�F�N�g�쐬
    optNew = document.createElement('option');
    // �A�C�e���̐������J��Ԃ�
    for (i = 0; i < cNodeList.length; i++) {
        obj.options[i] = new Option(cNodeList.item(i).text, i)
    }
}

/**
* [summary] �`�F�b�N�{�b�N�X�E���W�I�{�^���ɒl���Z�b�g
* [param]   nodeList       �m�[�h
**/
function setValueObj(nodeList) {
    // �^�OID�擾
    var id = nodeList.getAttribute("ID");
    // �o�̓f�[�^���擾
    var data = nodeList.getAttribute("VALUE");
    // �l���Z�b�g
    obj = document.getElementById(id);
    // �G�������g���Ȃ��ꍇ�������I������
    if (obj == null) {
        return;
    }
    // �`�F�b�N�̔���
    if (data == 0) {
        obj.checked = false;
    }
    else if (data == 1) {
        obj.checked = true;
    }
}

/**
* [summary] �^�u�R���g���[���ɒl���Z�b�g
* [param]   nodeList       �m�[�h
**/
function setValueObj2(nodeList) {
    // �^�OID�擾(TABCONTROL�^�O��ID)
    id = nodeList.getAttribute("ID");
    // �q�m�[�h�擾
    cNodeList = nodeList.childNodes;
    // �^�O���擾
    cName = cNodeList.item(0).nodeName;
    // �R�����g�̗L���ɂ����ID�擾�s�̐ؑ�
    if (cName == "#comment") {
        subId = cNodeList.item(1).getAttribute("ID");
    }
    else if (cName == "TABPAGE") {
        subId = cNodeList.item(0).getAttribute("ID");
    }
    // TABCONTROL�̃G�������g�擾
    obj = document.getElementById(id.concat("_").concat(subId));
    // �G�������g���Ȃ��ꍇ�������I������
    if (obj == null) {
        return;
    }
    // �A�C�e���̐������J��Ԃ�
    for (i = 0; i < cNodeList.length; i++) {
        // �^�O���擾
        gName = cNodeList.item(i).nodeName;
        // �R�����g�͖���
        if (gName == "#comment") {
            continue;
        }
        // �^�u�y�[�W��ID�擾
        pId = id.concat("_").concat(cNodeList.item(i).getAttribute("ID")).concat("_tab");
        // �o�̓f�[�^
        data = cNodeList.item(i).getAttribute("VALUE");
        // �^�O�t���\��������
        var tagObj = document.getElementById(pId).innerHTML;
        // �^�O�Ȃ��\��������
        var txt = document.getElementById(pId).innerText;
        // �������擾
        var num1 = tagObj.length;
        var num2 = txt.length;
        // �^�O�̏I��蕶�����擾
        var num3 = num1 - num2;
        // �^�O�̐؂���
        var tmp = tagObj.substring(0, num3);
        // �\���������XML�f�[�^�ɏ�������
        document.getElementById(pId).innerHTML = tmp.concat(data);
    }

}

/**
* [summary] �e�[�u���c�X�N���[���A������
* [param]   toId       �A����v�fID
* [param]   fromId     �A�����v�fID
**/
function divScrollVertical(toId, fromId) {
    // �A�����v�f�̃G�������g�擾
    var fromItem = document.getElementById(fromId);
    // �A����v�f�̃G�������g�擾
    var toItem = document.getElementById(toId);
    // �c�X�N���[���ݒ�
    if (toItem != null) {
        toItem.scrollTop = fromItem.scrollTop;
    }
}

/**
* [summary] �e�[�u�����X�N���[���A������
* [param]   toId       �A����v�fID
* [param]   fromId     �A�����v�fID
**/
function divScrollHorizontal(toId, fromId) {
    // �A�����v�f�̃G�������g�擾
    var fromItem = document.getElementById(fromId);
    // �A����v�f�̃G�������g�擾
    var toItem = document.getElementById(toId);
    // ���X�N���[���ݒ�
    if (toItem != null) {
        toItem.scrollLeft = fromItem.scrollLeft;
    }
}

/**
* [summary] �u���E�U��ʎ擾����
* [return]  �u���E�U���
**/
function getBlowserType() {

    var ua = navigator.userAgent.toLowerCase();
    var ver = navigator.appVersion.toLowerCase();

    // IE(11�ȊO)
    var isMSIE = (ua.indexOf('msie') > -1) && (ua.indexOf('opera') == -1);
    // IE6
    var isIE6 = isMSIE && (ver.indexOf('msie 6.') > -1);
    // IE7
    var isIE7 = isMSIE && (ver.indexOf('msie 7.') > -1);
    // IE8
    var isIE8 = isMSIE && (ver.indexOf('msie 8.') > -1);
    // IE9
    var isIE9 = isMSIE && (ver.indexOf('msie 9.') > -1);
    // IE10
    var isIE10 = isMSIE && (ver.indexOf('msie 10.') > -1);
    // IE11
    var isIE11 = (ua.indexOf('trident/7') > -1);
    // IE
    var isIE = isMSIE || isIE11;
    // Edge
    var isEdge = (ua.indexOf('edge') > -1);

    // Google Chrome
    var isChrome = (ua.indexOf('chrome') > -1) && (ua.indexOf('edge') == -1);
    // Firefox
    var isFirefox = (ua.indexOf('firefox') > -1);
    // Safari
    var isSafari = (ua.indexOf('safari') > -1) && (ua.indexOf('chrome') == -1);
    // Opera
    var isOpera = (ua.indexOf('opera') > -1);

    var result = {
        "isIe": isIE,
        "isEdge": isEdge,
        "isChrome": isChrome,
        "isFirefox": isFirefox,
        "isSafari": isSafari,
        "isOpera": isOpera
    };
    return result;
}

/**
* [summary] showModalDialog�g�p�\���菈��
* [return]  true/false
**/
function isUsableShowModalDialog() {
    var type = getBlowserType();
    if (type.isEdge || type.isChrome) {
        return false;
    }
    return true;
}

/**
* [summary] �I����ʕ\��
* [param]   url
**/
function showSelectForm(url) {
    if (isUsableShowModalDialog()) {
        var returnValue = window.showModalDialog(url, "", "dialogWidth:900px;dialogHeight:500px;resizable:yes");
        if (returnValue != null && returnValue.length == 1) {
            location.href = returnValue[0];
        } else if (returnValue != null && returnValue.length == 3) {
            openWinCenter(returnValue[0], returnValue[1], returnValue[2], 'no');
        }
    } else {
        location.href = url;
    }
}

/**
* [summary] �I����ʂ��|�b�v�A�b�v��ʂ�\��
* [param]   �p�����[�^
**/
function showPopupFromSelectForm(parameter) {
    if (isUsableShowModalDialog()) {
        (window.open('', '_top').opener = top).close();
        window.returnValue = parameter;
    } else {
        openWinCenter(parameter[0], parameter[1], parameter[2], 'no');
    }
}

 /**
* [summary] �I����ʂ���ʑJ��
* [param]   �p�����[�^
**/
function showTransitionFromSelectForm(parameter) {
    if (isUsableShowModalDialog()) {
        (window.open('', '_top').opener = top).close();
        window.returnValue = parameter;
    } else {
        location.href = parameter[0];
    }
}
