//
// jsc2302.14.js
//
// Cherednichenko JavaScript Collection Library (jsc) version 2302.14.
//
// https://github.com/IvanCherednichenko/jsc
//
// (C) 2007 - 2023 Ivan Cherednichenko. All Rights Reserved.
//
// This program is free software and distributed under GNU Lesser GPL 3.0 license.
//

function jscLib() {
  /// <summary>
  /// Определяет версию данной библиотеки.
  /// </summary>
  /// <returns>
  /// Возвращает номер версии данной библиотеки в виде строки.
  /// </returns>
  /// <introduced>
  /// 1309
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  /// <remarks>
  /// Номер версии определяется строкой в формате "YYMM.DD", где YY - две последние цифры года крайнего изменения данной
  /// версии библиотеки; а MM - две цифры месяца крайнего изменения данной версии библиотеки, DD - день изменения. Если
  /// это не оригинальная версия, то далее может быть добавлена дополнительная информация по усмотрению автора такой
  /// библиотеки в формате "YYMM.DD.N", где N - это и есть дополнительная информация.
  /// </remarks>
  this.version = function() {return '2302.14';}

  /// <summary>
  /// Определяет список лиц, кто внес вклад в разработку данной библиотеки.
  /// </summary>
  /// <returns>
  /// Возвращает строку со списком лиц, кто внес вклад в разработку данной библиотеки: каждое имя должно отделяться символом
  /// ','.
  /// </returns>
  /// <introduced>
  /// 1309
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  this.contributors = function() {return '';}

  /// <summary>
  /// Определяет является ли данная версия библиотеки оригинальной или нет.
  /// </summary>
  /// <returns>
  /// Возвращает true только в том случае, если данная версия библиотеки является оригинальной; иначе возвращает false.
  /// </returns>
  /// <introduced>
  /// 1309
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  this.isOriginalVersion = function() {return this.contributors().length == 0;}

  /// <summary>
  /// Осуществляет подключение внешнего файла сценария или таблицы стилей.
  /// </summary>
  /// <param name="url">
  /// URL-ссылка или путь к подключаемому файлу или массив из URL-ссылок или имен файлов.
  /// </param>
  /// <param name="id">
  /// Это необязательный параметр. Идентификатор тега, куда будет добавлен соответствующий тег подключения внешнего файла.
  /// Если передать пустую строку, то добавление будет происходить в тег <head>, если его нет в документе, то в тег <body>,
  /// если и этого тега нет в документе, то поиск дальше не производится.
  /// </param>
  /// <returns>
  /// true, если удалось подключить внешний файл.
  /// </returns>
  /// <introduced>
  /// 2210.10
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  /// <example>
  /// <code>
  /// jsc.include(['includeCssFile1.css', 'includeCssFile2.css', 'include.js'], 'div1');
  /// jsc.include('includeCssFile1.css', 'div1');
  /// jsc.include('includeCssFile2.css');
  /// jsc.include('includeCssFile2.js', '');
  /// </code>
  /// </example>
  this.include = function(url) {
    var LIdent = (arguments.length === 1 ? '' : arguments[1]);
    if (LIdent === '') {
      var LObj = document.getElementsByTagName('head')[0];
      if (!LObj) {
        LObj = document.getElementsByTagName('body')[0];
      }
    }
    else {
      var LObj = document.getElementById(LIdent);
    }

    if (Array.isArray(url)) {
      var LCount = 0;
      for (var i = 0; i < url.length; i++) {
        if (this.include(url[i], LIdent)) {
          LCount++;
        }
      }
      return (LCount === url.length ? true : false);
    }

    if (LObj) {
      var LLastDot = url.lastIndexOf('.');
      if (LLastDot != -1) {
        var LUrlExt = url.substr(LLastDot).toLowerCase();
        if (LUrlExt === '.css') {
          // Добавляемый файл - это стилевая таблица.
          var LLink = document.createElement('link');
          if (LLink) {
            LLink.setAttribute('rel', 'stylesheet');
            LLink.setAttribute('type', 'text\/css');
            LLink.setAttribute('href', url);
            LObj.appendChild(LLink);
            return true;
          }
        }
        else if (LUrlExt === '.js') {
          // Добавляемый файл - это сценарий JavaScript.
          var LScript = document.createElement('script');
          if (LScript) {
            LScript.setAttribute('src', url);
            LObj.appendChild(LScript);
            return true;
          }
        }
      }
    }
    return false;
  }

  /// <summary>
  /// Осуществляет добавление строки в HTML-таблицу.
  /// </summary>
  /// <param name="table">
  /// Ссылка на HTML-таблицу.
  /// </param>
  /// <param name="cells">
  /// Массив строк, каждый элемент которого будет расположен в качестве отдельной ячейки добавляемой строки.
  /// </param>
  /// <param name="cellTagName">
  /// Необязательный параметр, который представляет собой имя тега для каждой добавляемой ячейки. По умолчанию используется
  /// тег <td>.
  /// </param>
  /// <returns>
  /// true, если удалось добавить новую строку в таблицу.
  /// </returns>
  /// <introduced>
  /// 2302.14
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  /// <example>
  /// <code>
  /// var LTable = document.createElement('table');
  /// LTable.setAttribute('border', '1');
  /// jsc.createTableRow(LTable, ['0', '1', '2', '3', '4']);
  /// jsc.createTableRow(LTable, ['5', '6', '7', '8', '9']);
  /// document.getElementById('output').appendChild(LTable);
  /// </code>
  /// </example>
  this.createTableRow = function(table, cells, cellTagName) {
    var row = document.createElement('tr');
    if (row) {
      var f = document.createDocumentFragment(),
          n = cellTagName || 'td';
      for (var i = 0; i < cells.length; i++) {
        var cell = document.createElement(n);
        cell.textContent = cells[i];
        row.appendChild(cell);
      }
      f.appendChild(row);
      table.appendChild(f);
      return true;
    }
    return false;
  }

  /// <summary>
  /// Осуществляет добавление содержимого в HTML-таблицу.
  /// </summary>
  /// <param name="table">
  /// Ссылка на HTML-таблицу.
  /// </param>
  /// <param name="rows">
  /// Массив из массива строк, каждый элемент которого будет расположен в качестве новой строки в таблицу. Каждый элемент
  /// подмассива - это текстовое содержимое отдельной ячейки соответствующей строки.
  /// </param>
  /// <param name="decoration">
  /// Необходимость декорирования создаваемой таблицы: при значении true первая строка будет расположена внутри тега <thead>,
  /// и каждая отдельная его ячейка будет являться тегом <th>; все остальные строки будут расположены внутри тега <tbody>, и
  /// каждая отдельная его ячейка будет являться тегом <td>. При значении true все ячейки будут являться тегами <td>. Данный
  /// параметр является необязательным и имеет значение по умолчанию false.
  /// </param>
  /// <returns>
  /// true, если удалось добавить содержимое к таблице.
  /// </returns>
  /// <introduced>
  /// 2302.14
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  /// <example>
  /// <code>
  /// var LTable = document.createElement('table');
  /// LTable.setAttribute('border', '1');
  /// jsc.createTable(LTable, [['0', '1', '2', '3', '4'], ['5', '6', '7', '8', '9']], true);
  /// document.getElementById('output').appendChild(LTable);
  /// </code>
  /// </example>
  this.createTable = function(table, rows, decoration) {
    var d = decoration || false;
    if (d) {
      var f = document.createDocumentFragment(),
          h = document.createElement('thead');
      if (h) {
        this.createTableRow(h, rows[0], 'th');
        f.appendChild(h);
        table.appendChild(f);

        var b = document.createElement('tbody');
        if (b) {
          for (var i = 1; i < rows.length; i++) {
            this.createTableRow(b, rows[i]);
          }
          f.appendChild(b);
          table.appendChild(f);
        }
        return true;
      }
    }
    else {
      for (var i = 0; i < rows.length; i++) {
        this.createTableRow(table, rows[i]);
      }
      return true;
    }
    return false;
  }

  /// <summary>
  /// Производит извлечение всех тегов с именем tagName, расположенных на obj, свойство requiredAttribute которых
  /// удовлетворяет результату выполнения функции requiredAttributeValueFunc над значением этого свойства, присваивает или
  /// меняет свойства, перечисленные в массиве attributes на соответствующие значения свойства attributeValues.
  /// </summary>
  /// <returns>
  /// Массив тегов, которые удовлетворяют условиям переданным в функцию.
  /// </returns>
  /// <introduced>
  /// 2210.10
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  /// <example>
  /// <code>
  /// &sol;&sol;&sol; &lt;returns&gt;true, если указанную ссылку можно считать внешней.&lt;/returns&gt;
  /// function isExternalWebLink(url) {
  ///   return ((url.indexOf(':\/\/') != -1) ? true : false);
  /// }
  ///
  /// var LExternalLinks = jsc.setAttributesToAllTags(document.getElementById('links2'), 'a', 'href', isExternalWebLink, ['target'], ['_blank']);
  /// for (var i = 0; i < LExternalLinks.length; i++) {
  ///   LExternalLinks[i].setAttribute('title', LExternalLinks[i].getAttribute('href'));
  /// }
  /// </code>
  /// </example>
  this.setAttributesToAllTags = function(obj, tagName, requiredAttribute, requiredAttributeValueFunc, attributies, attributeValues) {
    var LElements = obj.getElementsByTagName(tagName),
        r = [];
    for (var i = 0; i < LElements.length; i++) {
      var LAttri = LElements[i].getAttribute(requiredAttribute);
      if ((LAttri != null) && (LAttri != '') && (requiredAttributeValueFunc(LAttri))) {
        for (var j = 0; j < attributies.length; j++) {
          LElements[i].setAttribute(attributes[j], attributeValues[j]);
          r[r.length] = LElements[i];
        }
      }
    }
    return r;
  }

  /// <summary>
  /// Локализует содержимое тегов <time>, которые расположены на obj, при этом такие теги не должны иметь атрибута attribute
  /// и содержимое таких тегов должно быть пустым.
  /// </summary>
  /// <returns>
  /// Массив тегов, которые были обработаны настоящей функцией.
  /// </returns>
  /// <introduced>
  /// 2210.12
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  /// <example>
  /// <code>
  /// jsc.localizeTimeTags(document);
  /// jsc.localizeTimeTags(document.getElementById('div3'), 'pubdate', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}, 'de-DE');
  /// </code>
  /// </example>
  this.localizeTimeTags = function(obj, attribute, options, locales) {
    var LElements = obj.getElementsByTagName('time'),
        r = [];
    for (var i = 0; i < LElements.length; i++) {
      if (!LElements[i].getAttribute(attribute || 'pubdate') && (LElements[i].innerHTML == '')) {
        LElements[i].innerHTML = (this.decodeDateTimeToDate(LElements[i].getAttribute('datetime')).toLocaleString(locales, options));
        r[r.length] = LElements[i];
      }
    }
    return r;
  }

  /// <summary>
  /// Конвертирует строку с датой и временем в объект.
  /// </summary>
  /// <introduced>
  /// 2009
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  /// <example>
  /// <code>
  /// console.log(jsc.decodeDateTime('2020-09-09T20:45:47+12'));
  /// </code>
  /// </example>
  this.decodeDateTime = function(dateTime) {
    var r = new Object;
    r.year = dateTime.substring(0, 4);
    r.month = dateTime.substring(5, 7);
    r.day = dateTime.substring(8, 10);
    r.hour = dateTime.substring(11, 13) || 0;
    r.minute = dateTime.substring(14, 16) || 0;
    r.second = dateTime.substring(17, 19) || 0;
    r.utc = dateTime.substring(19) || 0;
    return r;
  }

  /// <summary>
  /// Конвертирует объект даты, полученный с помощью функции decodeDateTime() в тип Date.
  /// </summary>
  /// <introduced>
  /// 2009
  /// </introduced>
  this.decodeDateTimeToDate = function(dateTime) {
    var r = this.decodeDateTime(dateTime);
    return (new Date(r.year, r.month - 1, r.day, r.hour, r.minute, r.second));
  }

  /// <summary>
  /// Осуществляет копирование строки.
  /// </summary>
  /// <param name="str">
  /// Исходная строка.
  /// </param>
  /// <param name="index">
  /// Порядковый номер (индекс) символа с которого необходимо начать копирование.
  /// </param>
  /// <param name="length">
  /// Длина копируемого фрагмента (если опущен, то подставляется длина исходной  строки).
  /// </param>
  /// <returns>
  /// Возвращает строку, которая получается путем копирования всех символов начиная с позиции aIndex и длиной aLength из
  /// строки aStr.
  /// </returns>
  /// <example>
  /// <code>
  /// var s = 'This is my first string!';
  /// console.log(jsc.copyString(s, 8));
  /// </code>
  /// </example>
  this.copyString = function(str, index, length) {
    var LLength = length || str.length;

    if ((index <= LLength) && (index >= 0) && (LLength >= 1)) {
      return str.substring(index, LLength + 1);
    }
    return '';
  }

  /// <summary>
  /// Осуществляет добавление подстроки в строку.
  /// </summary>
  /// <param name="subStr">
  /// Добавляемая подстрока.
  /// </param>
  /// <param name="str">
  /// Строка, в которую необходимо произвести добавление подстроки.
  /// </param>
  /// <param name="index">
  /// Индекс (номер) символа, где необходимо добавить подстроку.
  /// </param>
  /// <returns>
  /// Возвращает строку str, в индекс (номер) index которой, была добавлена подстрока substr.
  /// </returns>
  /// <introduced>
  /// 1309
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  /// <example>
  /// <code>
  /// var s = 'This is string!';
  /// s = jsc.insertString('my ', s, 8);
  /// </code>
  /// </example>
  this.insertString = function(subStr, str, index) {
    return (str.substr(0, index) + subStr + str.substr(index));
  }

  /// <summary>
  /// Осуществляет удаление подстроки из строки.
  /// </summary>
  /// <param name="str">
  /// Исходная строка.
  /// </param>
  /// <param name="index">
  /// Порядковый номер (индекс) символа с которого необходимо начать удаление.
  /// </param>
  /// <param name="length">
  /// Длина удаляемого фрагмента (если опущен, то подставляется длина исходной строки).
  /// </param>
  /// <returns>
  /// Возвращает строку, которая получается путем удаления всех символов начиная с позиции index и длиной length из строки
  /// str.
  /// </returns>
  /// <example>
  /// <code>
  /// var s = 'I do not want to do something!';
  /// console.log(jsc.deleteString(s, 2, 7));
  /// </code>
  /// </example>
  this.deleteString = function(str, index, length) {
    return (str.substr(0, index) + str.substr(index + (length || str.length)));
  }

  /// <summary>
  /// Производит замену строк subStr на newStr в строке str и возвращает новую строку.
  /// </summary>
  /// <example>
  /// <code>
  /// var s = 'I do not want to do something!';
  /// console.log(jsc.replaceString(s, );
  /// </code>
  /// </example>
  this.replaceString = function(str, subStr, newStr) {
    if ((subStr.indexOf('$') == -1) && (subStr.indexOf('(') == -1) && (subStr.indexOf(')') == -1)) {
      return (str.replace(new RegExp(subStr, 'g'), newStr));
    }
    else {
      var LSubStrIndex = str.indexOf(subStr),
          LSubStrLen = subStr.length;

      while (LSubStrIndex >= 0) {
        str = this.deleteString(str, LSubStrIndex, LSubStrLen);
        str = this.insertString(newStr, str, LSubStrIndex);
        LSubStrIndex = str.indexOf(subStr);
      }

      return str;
    }
  }

  /// <summary>
  /// Определяет количество подстрок в строке.
  /// </summary>
  /// <param name="subStr">
  /// Подстрока, количество вхождений которой необходимо определить.
  /// </param>
  /// <param name="str">
  /// Исходная строка.
  /// </param>
  /// <returns>
  /// Возвращает количество вхождений указанной подстроки в строке.
  /// </returns>
  /// <example>
  /// <code>
  /// console.log(jsc.countSubStr('l', 'Hello World!'));
  /// </code>
  /// </example>
  this.countSubStr = function(subStr, str) {
    return this.countSubStrToArray(subStr, str).length;
  }

  /// <summary>
  /// Определяет количество подстрок в строке.
  /// </summary>
  /// <param name="subStr">
  /// Подстрока, количество вхождений которой необходимо определить.
  /// </param>
  /// <param name="str">
  /// Исходная строка.
  /// </param>
  /// <returns>
  /// Возвращает массив с порядковыми номерами вхождений указанной подстроки в
  /// строке. Если таких подстрок не найдено, то возвращает пустой массив.
  /// </returns>
  /// <example>
  /// <code>
  /// var arr = jsc.countSubStrToArray('l', 'Hello World!'),
  ///     m = arr.length;
  /// console.log('Found ' + m + ' times!');
  /// </code>
  /// </example>
  this.countSubStrToArray = function(subStr, str) {
    var r = [],
        LSubStrLen = subStr.length;
    if (LSubStrLen > 0) {
      var i = str.indexOf(subStr);
      while (i >= 0) {
        r[r.length] = i;
        i = str.indexOf(subStr, i + LSubStrLen);
      }
    }
    return r;
  }

  /// <summary>
  /// Осуществляет поиск подстроки subStr в строке str с номером index (от 1).
  /// </summary>
  /// <example>
  /// <code>
  /// var s = 'Hello World!';
  /// console.log(jsc.pos('l', s, 1));
  /// console.log(jsc.pos('l', s, 2));
  /// console.log(jsc.pos('l', s, 3));
  /// console.log(jsc.pos('l', s, 4));
  /// console.log(jsc.pos('l', s, -1));
  /// console.log(jsc.pos('l', s, -2));
  /// console.log(jsc.pos('l', s, -3));
  /// console.log(jsc.pos('l', s, -4));
  /// </code>
  /// </example>
  this.pos = function(subStr, str, index) {
    var LCount = 0,
        LSubStrLen = subStr.length;
    if (LSubStrLen > 0) {
      if (index > 0) {
        var i = str.indexOf(subStr);
        while (i >= 0) {
          LCount++;
          if (LCount == index) {
            return i;
          }
          i = str.indexOf(subStr, i + LSubStrLen);
        }
      }
      else {
        index = Math.abs(index);
        var i = str.lastIndexOf(subStr);
        while (i >= 0) {
          LCount++;
          if (LCount == index) {
            return i;
          }
          i = str.lastIndexOf(subStr, i - LSubStrLen);
        }
      }
    }
    return -1;
  }
}

var jsc = new jscLib();