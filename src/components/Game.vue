<template>
  <div class="grid grid-cols-10 grid-rows-9 w-[350px] pt-10 mx-auto">
    <div
      class="border border-black p-2 text-center text-xs"
      :class="!NumbersLeft.includes(index + 1) ? 'bg-red-500 text-white' : ''"
      v-for="(n, index) in allNumbers"
    >
      <span>{{ index + 1 }}</span>
    </div>
  </div>
  <div class="flex justify-center">
    <button
      @click="panaroFunction"
      class="bg-blue-400 rounded px-10 mt-4 text-white font-bold cursor-pointer"
    >
      Tira
    </button>
  </div>
  <div class="fixed bottom-10 w-full">
    <div class="text-center w-full flex justify-around">
      <Cartelle
        v-for="(item, index) in cartelle.length"
        :player="index + 1"
        :NumbersLeft="NumbersLeft"
        :cartella="cartelle[index]"
      />
    </div>
  </div>
  <Modal :visibleModal="visibleModal" />
  <Number
    :currentNumber="currentNumber"
    :visibleModalNumber="visibleModalNumber"
  />
</template>

<script>
import Cartelle from "./Cartelle.vue";
import Modal from "./Modal.vue";
import Number from "./Number.vue";
export default {
  components: { Cartelle, Modal, Number },

  data() {
    return {
      visibleModal: false,
      visibleModalNumber: false,
      allNumbers: [],
      NumbersLeft: [],
      isCinquina: false,
      isTombola: false,
      currentNumber: 0,
      cartelle: [],
      nPlayer: 4,
    };
  },
  mounted() {
    this.pushNum();

    this.NumbersLeft = this.allNumbers.slice();
    for (let i = 0; i < this.nPlayer; i++) {
      this.cartelle[i] = this.pushNuminCartell();
    }
  },
  methods: {
    getRandomNumber() {
      if (!this.isTombola) {
        this.currentNumber =
          this.NumbersLeft[Math.floor(Math.random() * this.NumbersLeft.length)];

        const index = this.NumbersLeft.indexOf(this.currentNumber);
        if (index > -1) {
          // only splice array when item is found
          this.NumbersLeft.splice(index, 1); // 2nd parameter means remove one item only
        }

        if (!this.isCinquina) {
          this.isCinquina = this.ckCinquina();
          if (this.isCinquina) {
            alert("Cinquina");
          }
        }

        if (!this.isTombola) {
          this.isTombola = this.ckTombola();
          if (this.isTombola) {
            alert("Tombola");
          }
        }
      } else {
        alert("Gioco finito");
      }
    },

    ckCinquina() {
      for (let index = 0; index < this.cartelle.length; index++) {
        let count = 0;
        while (count < 3) {
          let cNumber = 0;
          for (let i = 0; i < 9; i++) {
            if (
              this.cartelle[index][count * 9 + i] > 0 &&
              !this.NumbersLeft.includes(this.cartelle[index][count * 9 + i])
            ) {
              cNumber++;
            }
          }
          count++;

          if (cNumber == 5) {
            return true;
          }
        }
      }

      return false;
    },

    ckTombola() {
      let count = 0;
      let cNumber = 0;

      for (let index = 0; index < this.cartelle.length; index++) {
        while (count < 3) {
          for (let i = 0; i < 9; i++) {
            if (
              this.cartelle[index][count * 9 + i] > 0 &&
              !this.NumbersLeft.includes(this.cartelle[index][count * 9 + i])
            ) {
              cNumber++;
            }
          }
          count++;

          if (cNumber == 15) {
            return true;
          }
        }
      }

      return false;
    },

    pushNuminCartell() {
      let element = [];
      let index = 0;
      while (element.length <= 8) {
        let n = 0;

        if (index == 0) {
          n = this.randomNm(1, 10);
        } else if (index == 80) {
          n = this.randomNm(80, 91);
        } else {
          n = this.randomNm(index, index + 10);
        }

        if (!element.includes(n)) {
          element.push(n);
        }

        if (index == 80) {
          continue;
        } else {
          index += 10;
        }
      }

      let arrayNumMax = [0, 10, 20, 30, 40, 50, 60, 70, 80];
      while (element.length <= 14) {
        let ncas = Math.floor(Math.random() * (10 - 1)) * 10;
        if (arrayNumMax.includes(ncas)) {
          let nAdd = 0;

          if (ncas == 0) {
            nAdd = this.randomNm(1, 10);
          } else if (ncas == 80) {
            nAdd = this.randomNm(80, 91);
          } else {
            nAdd = this.randomNm(ncas, ncas + 10);
          }

          if (!element.includes(nAdd)) {
            element.push(nAdd);
            const indexnm = arrayNumMax.indexOf(ncas);
            if (indexnm > -1) {
              arrayNumMax.splice(indexnm, 1);
            }
          }
        }
      }

      element.sort(function (a, b) {
        return a - b;
      });

      let arraySupremo = [];

      while (arraySupremo.filter((val) => val > 0).length < 15) {
        arraySupremo = [];
        for (let index = 0; index < 27; index++) {
          arraySupremo[index] = 0;
        }

        let arrayCkRow = [0, 1, 2];
        for (let c = 0; c < element.length; c++) {
          let NmString = element[c].toString();
          let nmCas = this.randomNm(0, 3);
          const indexRow = arrayCkRow.indexOf(nmCas);
          let val = 0;

          if (NmString.length == 1) {
            if (indexRow > -1) {
              val = nmCas * 9;
            } else {
              let rowAlternartive = this.ckRowDisponibility(
                arrayCkRow,
                arraySupremo,
                1
              );
              val = rowAlternartive * 9;
            }
          } else if (NmString.length > 1 && +NmString[0] > 7) {
            if (indexRow > -1) {
              val = (nmCas + 1) * 8;
              val = val + nmCas;
            } else {
              let rowAlternartive = this.ckRowDisponibility(
                arrayCkRow,
                arraySupremo,
                8
              );
              val = (rowAlternartive + 1) * 8;
              val = val + rowAlternartive;
            }
          } else {
            if (indexRow > -1) {
              val = +NmString[0] + nmCas * 9;
            } else {
              let rowAlternartive = this.ckRowDisponibility(
                arrayCkRow,
                arraySupremo,
                +NmString[0]
              );
              val = +NmString[0] + rowAlternartive * 9;
            }
          }
          arraySupremo[val] = element[c];

          if (
            arraySupremo.filter(
              (value, index) => index >= 0 && index < 9 && value > 0
            ).length == 5
          ) {
            const inx = arrayCkRow.indexOf(0);
            if (inx > -1) {
              arrayCkRow.splice(inx, 1);
            }
          }

          if (
            arraySupremo.filter(
              (value, index) => index >= 9 && index < 18 && value > 0
            ).length == 5
          ) {
            const inx = arrayCkRow.indexOf(1);
            if (inx > -1) {
              arrayCkRow.splice(inx, 1);
            }
          }

          if (
            arraySupremo.filter(
              (value, index) => index >= 18 && index < 27 && value > 0
            ).length == 5
          ) {
            const inx = arrayCkRow.indexOf(2);
            if (inx > -1) {
              arrayCkRow.splice(inx, 1);
            }
          }
        }
      }

      arraySupremo = this.repairOrder(arraySupremo);

      return arraySupremo;
    },

    repairOrder(arrayElement) {
      for (let i = 0; i < 9; i++) {
        if (
          arrayElement.filter(
            (value, index) =>
              (index == i || index == i + 9 || index == i + 18) && value > 0
          ).length > 1
        ) {
          let ct = i;
          let flag = false;
          let count = 0;

          while (!flag) {
            if (arrayElement[ct] > 0) {
              flag = true;
            } else {
              count++;
              ct = ct + 9;
            }
          }

          if (count > 0) {
            if (arrayElement[ct] > arrayElement[ct + 9]) {
              let temp = arrayElement[ct];
              arrayElement[ct] = arrayElement[ct + 9];
              arrayElement[ct + 9] = temp;
            }
          } else {
            let nm = arrayElement[ct + 9] > 0 ? 9 : 18;
            if (arrayElement[ct] > arrayElement[ct + nm]) {
              let temp = arrayElement[ct];
              arrayElement[ct] = arrayElement[ct + nm];
              arrayElement[ct + nm] = temp;
            }
          }
        }
      }

      return arrayElement;
    },

    randomNm(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    ckRowDisponibility(arrayCkRow, arrayData, number) {
      let count = 0;
      let val = 0;

      while (count < 3) {
        if (arrayCkRow.indexOf(count) > -1) {
          switch (number) {
            case 1:
              val = count * 9;
              if (arrayData[val] > 0) {
                for (let index = 0; index < 3; index++) {
                  val = index * 9;

                  if (arrayData[val] == 0 && arrayCkRow.indexOf(index) > -1) {
                    return index;
                  }
                }
              }

              return count;
              break;

            case 8:
              val = (count + 1) * 8;
              val = val + count;
              if (arrayData[val] > 0) {
                for (let index = 0; index < 3; index++) {
                  val = (index + 1) * 8;
                  val = val + index;
                  if (arrayData[val] == 0 && arrayCkRow.indexOf(index) > -1) {
                    return index;
                  }
                }
              }

              return count;

              break;

            default:
              val = number + count * 9;
              if (arrayData[val] > 0) {
                for (let index = 0; index < 3; index++) {
                  val = number + index * 9;

                  if (arrayData[val] == 0 && arrayCkRow.indexOf(index) > -1) {
                    return index;
                  }
                }
              }

              return count;
              break;
          }
        }

        count++;
      }
    },

    panaroFunction() {
      this.visibleModal = true;
      const slideInterval1 = setInterval(() => {
        this.visibleModal = false;
        this.visibleModalNumber = true;
        this.getRandomNumber();

        clearInterval(slideInterval1);
        const slideInterval2 = setInterval(() => {
          this.visibleModalNumber = false;
          clearInterval(slideInterval2);
        }, 2000);
      }, 3000);
    },

    pushNum() {
      for (let index = 1; index <= 90; index++) {
        this.allNumbers.push(index);
      }
    },
  },
};
</script>

<style scoped></style>
