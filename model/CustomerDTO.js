function CustomerDTO(id,name,address,salary) {
    var __id=id;
    var __name=name;
    var __address=address;
    var __salary=salary;

    this.getId = function () {
        return __id;
    }
    this.setId = function (v) {
        __id = v;
    }
    this.getName = function () {
        return __name;
    }
    this.setName = function (v) {
        __name = v;
    }
    this.getAddress = function () {
        return __address;
    }
    this.setAddress = function (v) {
        __address = v;
    }
    this.getSalary = function () {
        return __salary;
    }
    this.setSalary = function (v) {
        __salary = v;
    }

}

// var cc = new CustomerDTO("C001", "Dasun", "Galle", 1000);
// cc.id; // not allowed
// cc.setCustomerID("C004"); // ok
// cc.getCustomerID(); // ok
