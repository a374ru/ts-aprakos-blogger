# Список замеченых проблем

1. Неправильный формат вызова методов экземпляра в элементах-html.
2. **`a812023`** Некорректно высчитывается текущая седмица при `dev`-режиме в методе `Math.cell()`. При целом результате аргумента седмица высчитывается неправильно так как задается дата с нулевыми секундами, а методу `cell()` нужно значение более целого. Требуется добавить к вычисленному результату одну миллисекунду – `0.001` в дев-режиме.
3. **`a4012024`** Нет отступки крещенской - не работает!!!
