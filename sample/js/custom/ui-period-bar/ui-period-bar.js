/*

dateSelectionBar UI Component.
- Select a mont.

periodBar.create()
- create the object.
- x: 0, y:0, width: 600, height: 160

periodBar.createItemsByDataList(database.getMonthNameAndTitleDataList())
- create the items. And select the first item. periodBar.selectItemByIndex(0)

periodBar.selectItemByMonthNumber(monthNumber)
- select the item by month number.

periodBar.selectItemByIndex(periodBar.getLastItemIndex())
- select the last item.

periodBar.getSelectedDate()
- get the selected date object.
{title: 'BUGÜN', name: '17 Temmuz', day: 17, year: 2022, monthNumber: 7, …}

periodBar.onItemChange(function(selectedItemIndex, selectedItemData) {
    console.log(selectedItemIndex)
    console.log(selectedItemData)
})
- set the onItemChange function.

periodBar.getItemDataByIndex(0)
- get the item data by index.
{title: 'BUGÜN', name: '17 Temmuz', day: 17, year: 2022, monthNumber: 7, …}

periodBar.getSelectedItemIndex()
- get the selected item index.

periodBar.getLastItemIndex()
- get the last item index.

periodBar.getItemCount()
- get the total item count.
periodBar.itemList.length

periodBar.getContainerBox()
- get the container box.
return periodBar.box

periodBar.setVisible(visible)
- set the visible.
visible: 1, 0

*/

var periodBar = {}

periodBar.onItemChangeFunc = function() {}

periodBar.itemList = []
periodBar.selectedItemIndex = -1

periodBar.create = function() {

    periodBar.WIDTH = 600
    periodBar.HEIGHT = 160
    periodBar.BACK_WIDTH = 600 - 40
    periodBar.BACK_HEIGHT = periodBar.HEIGHT - 40
    periodBar.BUTTON_SIZE = periodBar.HEIGHT - 80

    // BOX: Object container box.
    periodBar.box = createBox(0, 0, periodBar.WIDTH, periodBar.HEIGHT);
    that.border = 0;
    that.color = "transparent";
    //that.element.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.1)"
    /* MOTION: */
    that.top = periodBar.HEIGHT * -1;
    that.opacity = 0;
    // that.setMotion("top 0.5s, opacity 0.5s")
    that.setMotion("top 0.3s, opacity 0.3s");
    /*
    that.top = periodBar.HEIGHT * -1
    that.opacity = 0
    */


    // Box: Object background box.
    periodBar.box.boxBack = createBox(20, 20, periodBar.BACK_WIDTH, periodBar.BACK_HEIGHT)
    periodBar.box.add(that)
    that.color = "white"
    that.round = 50
    that.border = 1
    that.borderColor = "#141414"

    // BOX: Items group box.
    periodBar.box.itemGroup = createBox(20, 20, periodBar.BACK_WIDTH, periodBar.BACK_HEIGHT)
    periodBar.box.add(that)
    that.color = "transparent"

    // BUTTON: Left button.
    periodBar.box.boxLeftButton = createBox(40, 40, periodBar.BUTTON_SIZE, periodBar.BUTTON_SIZE)
    periodBar.box.add(that)
    that.color = "#D8D8D8"
    that.border = 1
    that.borderColor = "#141414"
    that.round = that.width
    that.opacity = 0.3
    /* MOTION: */
    // that.setMotion("opacity 0.5s")
    that.onClick(function(self) {
        setTimeout(function() {
            periodBar.selectPreviousItem()
        }, 50)
    })

    // BUTTON: Right button.
    periodBar.box.boxRightButton = createBox(40, 40, periodBar.BUTTON_SIZE, periodBar.BUTTON_SIZE)
    periodBar.box.add(that)
    that.right = 40
    that.color = "#D8D8D8"
    that.border = 1
    that.borderColor = "#141414"
    that.round = that.width
    that.opacity = 0.3
    /* MOTION: */
    // that.setMotion("opacity 0.5s")
    that.onClick(function(self) {
        setTimeout(function() {
            periodBar.selectNextItem()
        }, 50)
    })

    // Create items.
    // periodBar.createItemsByDataList(periodBar.testDataList)
    // periodBar.selectItemByIndex(periodBar.itemList.length - 1)

}

periodBar.createItemsByDataList = function(dataList) {

    periodBar.itemList = []
    periodBar.selectedItemIndex = -1

    periodBar.box.itemGroup.html = ""

    for (var i = 0; i < dataList.length; i++) {
        periodBar.box.itemGroup["item" + i] = periodBar.createItem(dataList[i], i)
        periodBar.box.itemGroup.add(that)
    }

    // Select the first item.
    if (periodBar.itemList.length > 0) {
        //periodBar.selectItemByIndex(0)
    }

}

periodBar.createItem = function(data, index) {

    // Create item.
    // BOX: Item container box.
    var item = createBox()
    // periodBar.box.boxBack.add(that)
    that.color = "transparent"
    that.width = periodBar.BACK_WIDTH
    that.height = periodBar.BACK_HEIGHT
    that.top = 0
    that.left = periodBar.BACK_WIDTH * -1
    that.element.style.transform = "scale(0.1)"
    that.opacity = 0
    /* MOTION: */
    // that.setMotion("left 0.4s, opacity 0.4s, transform 0.4s")
    that.setMotion("left 0.2s, opacity 0.2s, transform 0.2s")

    data.index = index;

    that.data = data;
    that.index = index;
    
    // LABEL: Item date title.
    item.lblDateTitle = createLabel(0, 26, periodBar.BACK_WIDTH)
    item.add(that)
    that.textAlign = "center"
    that.textColor = "#9B9B9B"
    //that.element.style.fontFamily = "opensans-bold"
    that.fontSize = 20
    that.text = data.title

    // LABEL: Item date name.
    item.lblDateName = createLabel(0, 46, periodBar.BACK_WIDTH)
    item.add(that)
    that.textAlign = "center"
    that.textColor = "#141414"
    that.element.style.fontFamily = "opensans-bold"
    that.fontSize = 35
    that.text = data.name

    periodBar.itemList.push(item)
    makeBasicObject(item)
    return item

}

periodBar.selectNextItem = function(self) {

    periodBar.selectItemByIndex(parseInt(periodBar.selectedItemIndex) + 1)

}

periodBar.selectPreviousItem = function(self) {

    periodBar.selectItemByIndex(parseInt(periodBar.selectedItemIndex) - 1)

}

periodBar.selectItemByMonthNumber = function($monthNumber) {

    for (var i = 0; i < periodBar.getItemCount(); i++) {
        var _itemData = periodBar.getItemDataByIndex(i);
        if (_itemData.monthNumber == $monthNumber) {
            // Kayıydın düzenlendiği dönem.
            periodBar.selectItemByIndex(i);
            return i;
        }
    }

}

periodBar.selectItemByIndex = function(index) {

    // min value
    if (index < 0) {
        index = 0
    }

    // max value
    if (index >= periodBar.itemList.length) {
        index = periodBar.itemList.length - 1
    }

    // index aynı değil ise,
    if (periodBar.selectedItemIndex != index) {

        // önceki ve şimdiki parçalar.
        var currentItem = periodBar.itemList[index]
        var previousItem = null

        // önceden seçilmiş bir parça var ise,
        if (periodBar.selectedItemIndex != -1) {
            previousItem = periodBar.itemList[periodBar.selectedItemIndex]
        }
        var previousItemLeft = 0

        currentItem.dontMotion()

        // Parçaların yerlerini hesapla.
        if (periodBar.selectedItemIndex > index) {
            currentItem.left = periodBar.BACK_WIDTH * -1
            previousItemLeft = periodBar.BACK_WIDTH

        } else if (periodBar.selectedItemIndex < index) {
            currentItem.left = periodBar.BACK_WIDTH
            previousItemLeft = periodBar.BACK_WIDTH * -1
        }

        // Önceki seçiliş parçayı, gizle.
        if (periodBar.selectedItemIndex != -1) {
            previousItem.withMotion(function(self) {
                self.left = previousItemLeft
                self.element.style.transform = "scale(0.1)"
                self.opacity = 0
            })
        }

        // Şimdiki seçiliş parçayı, göster.
        if (periodBar.selectedItemIndex != -1) {
            currentItem.withMotion(function(self) {
                self.left = 0
                self.element.style.transform = "scale(1)"
                self.opacity = 1
            })
        } else {
            currentItem.left = 0
            currentItem.element.style.transform = "scale(1)"
            currentItem.opacity = 1
        }

        // Buttonların durumunu değiştir.
        if (index == 0) {
            periodBar.box.boxLeftButton.opacity = 0.2
        } else {
            periodBar.box.boxLeftButton.opacity = 1
        }

        if(index == periodBar.itemList.length - 1) {
            periodBar.box.boxRightButton.opacity = 0.2
        } else {
            periodBar.box.boxRightButton.opacity = 1
        }

        // Seçili parça index'ini değiştir.
        periodBar.selectedItemIndex = index
        periodBar.onItemChangeFunc(index, currentItem.data)

    }

}

periodBar.onItemChange = function(func) {
    periodBar.onItemChangeFunc = func
}

periodBar.getSelectedDate = function() {

    var result = periodBar.getItemDataByIndex(
        periodBar.getSelectedItemIndex()
    )

    console.log("periodBar.getSelectedDate:")
    console.log(result)

    return result
}

periodBar.getItemDataByIndex = function($index) {
    if ($index >= 0 && $index < periodBar.itemList.length) {

        var result = periodBar.itemList[$index].data;
        result.$index = $index;

        return result;
        
    } else {
        return null
    }
}

periodBar.getSelectedItemIndex = function() {
    return periodBar.selectedItemIndex;
}

periodBar.getLastItemIndex = function() {
    return (periodBar.itemList.length - 1);
}

periodBar.getItemCount = function() {
    return (periodBar.itemList.length);
}

periodBar.getContainerBox = function() {
    return periodBar.box;
}

periodBar.setVisible = function(visible) {

    if (visible != periodBar.box.lastVisibleValue) {
        if (visible) {
            /* MOTION: */
            periodBar.box.dontMotion();
            periodBar.box.top = periodBar.HEIGHT * -1;
            periodBar.box.opacity = 0;
            periodBar.box.withMotion(function(self) {
                self.top = 0;
                self.opacity = 1;
            })
        } else {
            periodBar.box.dontMotion();
            periodBar.box.top = 0;
            periodBar.box.opacity = 1;
            periodBar.box.withMotion(function(self) {
                self.top = periodBar.HEIGHT * -1;
                self.opacity = 0;
            })
        }
    }
    
    periodBar.box.lastVisibleValue = visible;

}