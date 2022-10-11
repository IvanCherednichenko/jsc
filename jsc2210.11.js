//
// jsc2210.11.js
//
// Cherednichenko JavaScript Collection Library (jsc) version 2210.11.
//
// https://github.com/IvanCherednichenko/jsc
//
// (C) 2007 - 2022 Ivan Cherednichenko. All Rights Reserved.
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
  this.version = function() {return '2210.11';}

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
  /// True, если удалось подключить внешний файл.
  /// </returns>
  /// <introduced>
  /// 2210.10
  /// </introduced>
  /// <actual>
  /// true
  /// </actual>
  /// <remarks>
  /// Данную функцию следует использовать вместо функции includeCssFile().
  /// </remarks>
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
        if (this.include(url[i])) {
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
        i,
        x = 0,
        l = subStr.length;

    if (l > 0) {
      i = str.indexOf(subStr);
      while (i >= 0) {
        r[r.length] = i + x;
        x = x + i + l;
        str = str.substring(i + l);
        i = str.indexOf(subStr);
      }
    }

    return r;
  }
}

var jsc = new jscLib();
