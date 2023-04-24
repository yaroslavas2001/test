<template>
  <div class="test">
    <input class="test_input" :class="{ error: error.length > 0 }" v-model="value" @keydown="keydown" @keyup="keyup"
      @blur="onBlur(value)" @focus="onFocus">
    <div class="error_text" v-if="error">{{ error }}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "main-page",
})
export default class MainPage extends Vue {
  value: string = "";
  innerValue: any = ''
  latestValue: any = ''

  error: string = ''
  // 5646.6456.35434
  reg = /[0-9]*\.[0-9]*\.[0-9]*/
  // 345++345 или 342+-453
  reg2 = /([\+\.\-\/\*\,]){2}/

  symbols = ["*", '/', '-', '+', '.', ',']
  commands = ["Backspace", 'ArrowLeft', 'ArrowRight']
  // 1 вариант, переписывать значение если подряд 2 опереации
  // 2 вариант, писать об ошибке
  keyup(e: any) {
    if (this.reg2.test(this.value)) {
      this.value = this.latestValue
      // this.error = "Не правильный формат операций"
    }
    else {
      this.latestValue = this.value
      // this.error = ''
    }
  }
  keydown(e: any) {
    let lastValue = this.value[this.value.length - 1]
    let isLikeTheSameSymbol = this.symbols.includes(lastValue) && this.symbols.includes(e.key)
    if (!(!isNaN(Number(e.key)) || this.symbols.includes(e.key) || this.commands.includes(e.key)) ||
      e.key === ' ' || isLikeTheSameSymbol)
      e.preventDefault();
  }

  onFocus() {
    this.value = this.innerValue
  }

  onBlur(value: any) {
    this.innerValue = value
    if (value.length > 0) {
      let withoutDots = value.replaceAll(',', '.')
      let lastValue = this.value[this.value.length - 1]
      if (this.reg.test(withoutDots)) this.error = "Не правильный формат числа"
      else if (this.symbols.includes(lastValue)) this.error = "Не правильный формат операции"
      else {
        let result = eval(withoutDots)
        if (result <= 0) this.error = "Значение ниже допустимого; > 0"
        else this.error = ''
        if (Number.isInteger(result)) this.value = result.toString()
        else this.value = result.toFixed(2).toString()
      }
    } else {
      this.error = "Введите сумму"
    }
  }  
}
</script>
<style lang="less" scoped>
.test {
  // margin: ;
}

.test_input {
  border-radius: 4px;
  padding: 20px 12px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.24);
  outline: none;
  text-align: center;
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}

.test_input:active,
.test_input:focus {
  border: 2px solid #ffd300;
}

.error {

  border-color: #c10015;
}

.error_text {
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);

  color: #c10015;
}
</style>
