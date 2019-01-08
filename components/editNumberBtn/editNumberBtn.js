// components/editNumberBtn/editNumberBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    quantity:{
      type:Number,
      value:1,
    },

    minQuantity:{
      type: Number,
      value: 1,
    }
   
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    substract:function(){
      var quantity = this.data.quantity;
      if(quantity<=this.data.minQuantity)
      {
        return
      }
      quantity--;
      this.setData({
        quantity: quantity,
      })
      this.triggerEvent("quantityedit",{quantity:quantity,hidden:true})
    },

    add: function () {
      var quantity = this.data.quantity;
      quantity++;
      this.setData({
        quantity: quantity,
      })
      this.triggerEvent("quantityedit", { quantity: quantity,hidden:true })
    },

    showeditPop:function(){
      this.triggerEvent("show", {hidden:false})
    }
  }
})
