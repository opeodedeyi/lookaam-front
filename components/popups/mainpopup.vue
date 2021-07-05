<template>
  <div class="main-popup" @click="closePopup">
      <div class="main-popup-content" @click.stop="doNothing">
          <div class="popup-header">
            <div class="popup-header-empty"></div>
            <div v-if="title" class="popup-header-title">{{ title }}</div>
            <img class="popup-header-cancel" src="~/assets/svg/cancel.svg" alt="" @click="closePopup"/>
          </div>
          <div class="popup-body">
            <slot></slot>
          </div>
          <div class="popup-footer">
            <div class="popup-footer-btn"><button class="button-back f-btn" @click.prevent="bkBtnPressed" v-if="bkBtnTxt">{{ bkBtnTxt }}</button></div>
            <div class="popup-footer-btn"><button class="button-onward f-btn" @click.prevent="ftBtnPressed" v-if="ftBtnTxt">{{ ftBtnTxt }}</button></div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  methods: {
    closePopup() {
      this.$emit("close-popup", this.objId);
    },
    doNothing() {
      return
    }
  },
  props: {
    title: {
      type: String,
      required: false
    },
    ftBtnTxt: {
      type: String,
      required: false
    },
    bkBtnTxt: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
  .main-popup {
    position: fixed;
    transition: 1ms ease-in-out;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(var(--rgba-backdrop), 0.6);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }

  .main-popup-content {
    background-color: var(--color-white);
    width: 100%;
    height: 100%;
    position: relative;
    cursor: default;
  }

  .popup-header,
  .popup-footer {
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    position: absolute;
    background-color: var(--color-white);
    z-index: 101;
  }

  .popup-header {
    border-bottom: 1px solid var(--color-gray);
    top: 0;
  }

  .popup-footer {
    border-top: 1px solid var(--color-gray);
    bottom: 0;
  }

  .popup-body {
    height: 100%;
    padding: 100px 20px;
    position: relative;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .popup-header-empty {
    content: "";
  }

  .popup-header-empty::before {
    content: "";
  }

  .popup-header-title {
    font-size: 1.125rem;
    font-weight: 500;
  }

  .popup-header-cancel {
    font-size: 1.125rem;
    font-weight: 500;
    cursor: pointer;
    z-index: 101;
  }

  .popup-footer-btn {
    width: 45%;
  }

  .f-btn {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }

  .button-back {
    text-decoration: underline;
    color: var(--color-company);
    text-underline-offset: .2rem;
    background-color: transparent;
  }

  .button-back:hover {
    color: var(--color-company2);
    background-color: var(--color-card);
  }

  .button-onward {
    text-decoration: none;
    color: var(--color-white);
    background-color: var(--color-company);
  }

  .button-onward:hover {
    background-color: var(--color-company2);
  }

  /* desktop screen */
  @media only screen and (min-width: 610px) {
    .main-popup-content {
      max-width: 600px;
      max-height: 570px;
      border-radius: 10px;
    }

    .popup-header,
    .popup-footer {
      padding: 0 50px;
      border: none;
    }

    .popup-body {
      padding: 100px 50px;
    }

    .popup-footer-btn {
      width: 40%;
    }
  }
</style>