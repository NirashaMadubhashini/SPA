function ItemDTO(code,name,price,quantity) {
    var __code=code;
    var __itemName=name;
    var __price=price;
    var __quantity=quantity;

    this.getCode = function () {
        return __code;
    }
    this.setCode = function (v) {
        __code = v;
    }
    this.getItemName = function () {
        return __itemName;
    }
    this.setItemName = function (v) {
        __itemName = v;
    }
    this.getPrice = function () {
        return __price;
    }
    this.setPrice = function (v) {
        __price = v;
    }
    this.getQuantity = function () {
        return __quantity;
    }
    this.setQuantity = function (v) {
        __quantity = v;
    }

}