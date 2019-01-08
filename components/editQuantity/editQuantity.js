// components/editQuantity/editQuantity.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Number,
      value:0,
    },
    quantity: {
      type: Number,
      value: 1,
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
    // num:1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setNum:function(e){
      var quantity = e.detail.value;

      if(quantity)
      {
        if (isNaN(quantity)) {
          quantity = 1;
        }
      }
      else{
        quantity = "";
      }
      this.setData({
        quantity : quantity,
      })
    },

    Add:function(){
      var num = this.data.quantity;
      num++;
      this.setData({
        quantity: num,
      })
    },

    Substract:function(){
      var num = this.data.quantity;
      if (num <= this.data.minQuantity)
      {
        return
      }
      else num--;
      this.setData({
        quantity: num,
      })
    },
    cancel:function(){
      this.triggerEvent('editCancel', {index:this.data.index})
    },
    
    sure:function(){
      var quantity = this.data.quantity;
      var minQuantity = this.data.minQuantity;

      if(this.data.quantity)
      {
        if(quantity<minQuantity)
        {
          quantity = minQuantity;
        }

        this.triggerEvent('edit', { index: this.data.index, quantity: quantity});
      }
      else{
        wx.showToast({
          title: '购买数量不得少于一件',
          duration:1500,
          icon:'none',
        })
      }
      
    }
  }
})
