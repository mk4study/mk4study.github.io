/** 
* [summary] タブページの切り替えを行う
* [param]   tabName        タブ名
*           tabPageName    表示するタブページ名
* [date]    2011/06/17
**/
function tabPageChange(tabName, tabPageName) {
    /* すべてのタブページを非表示にする */
    for (var i = 0; i < tabName.length; i++) {
        document.getElementById(tabName[i]).style.display = "none";
        document.getElementById(tabName[i].concat('_tab')).className = '';
    }

    /* 指定されたタブページを表示に設定する */
    document.getElementById(tabPageName).style.display = "block";
    document.getElementById(tabPageName.concat('_tab')).className = 'selected';
}

/** 
* [summary] ノードの展開された状態と折りたたまれた状態の切り替え
* [param]   e       イベント
* [date]    2011/06/20
**/
function nodeToggle(e) {
    e = e || (window.event || {});
    var el, tgt = e.srcElement || e.target;
    if (tgt && (el = tgt.getElementsByTagName('ul').item(0)))
        el.className = 'therenowhere'.replace(el.className, '');
}


/** 
* [summary] テーブルの検索を行う
* [param]   tableName      テーブル名
* [date]    2011/06/21
**/
function searchTable(tableName) {
    // テーブルの行数分処理を行う
    for (var i = 1; i < tableName.rows.length; i++) {
        // 表示されていない場合、表示を行う
        if (tableName.rows[i].style.display == "none") {
            tableName.rows[i].style.display = '';
        }
    }
}

/**
* [summary] ポップアップを中央で開く
* [param]   docName     ドキュメント名
* [param]   width       幅
* [param]   height      高さ
* [param]   resizable   サイズ変更
* [date]    2011/08/19
**/
function openWinCenter(docName, width, height, resizable) {
    // ポップアップを表示するx座標
    x = (screen.width - width) / 2;
    // ポップアップを表示するy座標
    y = (screen.height - height) / 2;

    window.open(docName, '', "left=" + x + ",top=" + y + ",width=" + width + ",height=" + height + ",resizable=" + resizable+ ", scrollbars = yes");
}

/**
* [summary] xmlを読み込む
* [param]   xmlPath       ファイルパス
**/
function readXml(xmlPath) {
    try {
        // xmlオブジェクト生成
        obXml = new ActiveXObject('microsoft.XMLDOM');
        // 同期処理
        obXml.async = false;
        // xml読み込み
        obXml.load(xmlPath);
        // ルートノード参照
        rNode = obXml.documentElement;
        // 子ノード
        cNode = rNode.childNodes;
        // 全ての子ノードを検索する
        for (var i = 0; i < cNode.length; i++) {
            // タグ名取得(TEXTBOX,TABLEなど)
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
* [summary] テキストボックスに値をセット
* [param]   nodeList       ノード
**/
function setValueTextBox(nodeList) {
    // タグID取得
    id = nodeList.getAttribute("ID");
    // 出力データを取得
    data = nodeList.getAttribute("VALUE");
    // テキストボックスに値をセット
    document.getElementById(id).value = data;
}

/**
* [summary] テーブルに値をセット
* [param]   nodeList       ノード
**/
function setValueTable(nodeList) {
    // タグID取得(TABLEタグのID)
    id = nodeList.getAttribute("ID");
    // TABLEのエレメント取得
    table = document.getElementById(id);
    // 子ノード取得
    cNodeList = nodeList.childNodes;
    // 現在の行を取得
    rowCount = table.rows.length;
    // 現在のセルを取得
    colCount = table.rows[0].cells.length;
    // 行を追加
    row = table.insertRow(rowCount);
    // セルの数分繰り返し
    for (var j = 0; j < colCount; j++) {
        var cell = row.insertCell(j);
        cell.innerText = cNodeList.item(j).text;
    }
}

/**
* [summary] 画面の初期設定を行う
* [param]   xmlPath       ファイルパス
**/
function initScreen(xmlPath) {
    try {
        // xmlオブジェクト生成
        obXml = new ActiveXObject('microsoft.XMLDOM');
        // 同期処理
        obXml.async = false;
        // xml読み込み
        obXml.load(xmlPath);
        // ルートノード参照
        rNode = obXml.documentElement;
        // 子ノード
        cNode = rNode.childNodes;
        // 全ての子ノードを検索する
        for (var i = 0; i < cNode.length; i++) {
            // タグ名取得
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
* [summary] コンボボックス・リストボックスにアイテムをセット
* [param]   nodeList       ノード
**/
function setInsObj(nodeList) {
    // タグID取得(COMBOBOXタグのID)
    id = nodeList.getAttribute("ID");
    // COMBOBOXのエレメント取得
    obj = document.getElementById(id);
    // エレメントがない場合処理を終了する
    if (obj == null) {
        return;
    }
    // 子ノード取得
    cNodeList = nodeList.childNodes;
    // オブジェクト作成
    optNew = document.createElement('option');
    // アイテムの数だけ繰り返し
    for (i = 0; i < cNodeList.length; i++) {
        obj.options[i] = new Option(cNodeList.item(i).text, i)
    }
}

/**
* [summary] チェックボックス・ラジオボタンに値をセット
* [param]   nodeList       ノード
**/
function setValueObj(nodeList) {
    // タグID取得
    var id = nodeList.getAttribute("ID");
    // 出力データを取得
    var data = nodeList.getAttribute("VALUE");
    // 値をセット
    obj = document.getElementById(id);
    // エレメントがない場合処理を終了する
    if (obj == null) {
        return;
    }
    // チェックの判定
    if (data == 0) {
        obj.checked = false;
    }
    else if (data == 1) {
        obj.checked = true;
    }
}

/**
* [summary] タブコントロールに値をセット
* [param]   nodeList       ノード
**/
function setValueObj2(nodeList) {
    // タグID取得(TABCONTROLタグのID)
    id = nodeList.getAttribute("ID");
    // 子ノード取得
    cNodeList = nodeList.childNodes;
    // タグ名取得
    cName = cNodeList.item(0).nodeName;
    // コメントの有無によってID取得行の切替
    if (cName == "#comment") {
        subId = cNodeList.item(1).getAttribute("ID");
    }
    else if (cName == "TABPAGE") {
        subId = cNodeList.item(0).getAttribute("ID");
    }
    // TABCONTROLのエレメント取得
    obj = document.getElementById(id.concat("_").concat(subId));
    // エレメントがない場合処理を終了する
    if (obj == null) {
        return;
    }
    // アイテムの数だけ繰り返し
    for (i = 0; i < cNodeList.length; i++) {
        // タグ名取得
        gName = cNodeList.item(i).nodeName;
        // コメントは無視
        if (gName == "#comment") {
            continue;
        }
        // タブページのID取得
        pId = id.concat("_").concat(cNodeList.item(i).getAttribute("ID")).concat("_tab");
        // 出力データ
        data = cNodeList.item(i).getAttribute("VALUE");
        // タグ付き表示文字列
        var tagObj = document.getElementById(pId).innerHTML;
        // タグなし表示文字列
        var txt = document.getElementById(pId).innerText;
        // 長さを取得
        var num1 = tagObj.length;
        var num2 = txt.length;
        // タグの終わり文字数取得
        var num3 = num1 - num2;
        // タグの切り取り
        var tmp = tagObj.substring(0, num3);
        // 表示文字列をXMLデータに書き換え
        document.getElementById(pId).innerHTML = tmp.concat(data);
    }

}

/**
* [summary] テーブル縦スクロール連動処理
* [param]   toId       連動先要素ID
* [param]   fromId     連動元要素ID
**/
function divScrollVertical(toId, fromId) {
    // 連動元要素のエレメント取得
    var fromItem = document.getElementById(fromId);
    // 連動先要素のエレメント取得
    var toItem = document.getElementById(toId);
    // 縦スクロール設定
    if (toItem != null) {
        toItem.scrollTop = fromItem.scrollTop;
    }
}

/**
* [summary] テーブル横スクロール連動処理
* [param]   toId       連動先要素ID
* [param]   fromId     連動元要素ID
**/
function divScrollHorizontal(toId, fromId) {
    // 連動元要素のエレメント取得
    var fromItem = document.getElementById(fromId);
    // 連動先要素のエレメント取得
    var toItem = document.getElementById(toId);
    // 横スクロール設定
    if (toItem != null) {
        toItem.scrollLeft = fromItem.scrollLeft;
    }
}

/**
* [summary] ブラウザ種別取得処理
* [return]  ブラウザ種別
**/
function getBlowserType() {

    var ua = navigator.userAgent.toLowerCase();
    var ver = navigator.appVersion.toLowerCase();

    // IE(11以外)
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
* [summary] showModalDialog使用可能判定処理
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
* [summary] 選択画面表示
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
* [summary] 選択画面よりポップアップ画面を表示
* [param]   パラメータ
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
* [summary] 選択画面より画面遷移
* [param]   パラメータ
**/
function showTransitionFromSelectForm(parameter) {
    if (isUsableShowModalDialog()) {
        (window.open('', '_top').opener = top).close();
        window.returnValue = parameter;
    } else {
        location.href = parameter[0];
    }
}
