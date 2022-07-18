<script>
/* eslint-disable no-undef */
/* const RECAPTCHA = '6Le6QDIfAAAAAGQe665G-jCoG9JFoRuDCoJpeXX9';
function getCaptcha(cbk) {
  grecaptcha.execute(RECAPTCHA, {action: 'submit'}).then(cbk);
} */

const HOST = "https://evmtestnet.conflux123.xyz";

export default {
  data() {
    return {
      address: "",
      hash: "",
      captcha: "",
      coin: "cfx",
      captchaContent: "",
      captchaId: "",
      claiming: false,
    };
  },

  methods: {
    /* getFaucet1(e) {
      e.preventDefault();
      if (!this.address) {
        alert("Please enter an address");
        return;
      }
      this.claiming = true;

      getCaptcha((token) => {
        // fetch(`${URL}/faucet?address=${this.address}&token=${token}`)
        fetch(`${URL}/faucet`, {
          method: "POST",
          body: JSON.stringify({ address: this.address, token: token }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.claiming = false;
            if (data.code) {
              // pretty message
              let message = data.message;
              if (message.match("Tx with same nonce already inserted")) {
                message = "Service is busy, please try again later";
              }
              alert("Claim failed: " + message);
            } else {
              this.hash = data.hash;
              alert("Claimed success!");
            }
          })
          .catch((error) => {
            this.claiming = false;
            console.log("error", error);
            alert("Error: " + error);
          });
      });
    }, */

    getCaptcha() {
      fetch(`${HOST}/v1/captcha`)
        .then((response) => response.json())
        .then((data) => {
          this.captchaId = data.captchaId;
          this.captchaContent = data.content;
        });
    },

    getFaucet(e) {
      e.preventDefault();
      if (!this.address) {
        alert("Please enter an address");
        return;
      }
      if (!this.captcha) {
        alert("Please enter the captcha");
        return;
      }

      this.claiming = true;
      let captchaQuery = `captchaId=${this.captchaId}&captchaVal=${this.captcha}`;
      if (this.coin === "cfx") {
        captchaQuery += `&address=${this.address}`;
        fetch(`${HOST}/v1/CFX?${captchaQuery}`, { method: "POST" })
          .then((response) => response.json())
          .then((data) => {
            this.claiming = false;
            if (data.code === 0) {
              alert("Claimed sucess!");
              this.hash = data.data;
            } else {
              alert("Claim failed: " + data.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        fetch(`${HOST}/v1/ERC20?${captchaQuery}`, {
          method: "POST",
          body: JSON.stringify({ address: this.address, name: this.coin }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.claiming = false;
            if (data.code === 0) {
              alert("Claimed sucess!");
              this.hash = data.data;
            } else {
              alert("Claim failed: " + data.message);
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },

  computed: {
    txScanLink() {
      return `https://evmtestnet.confluxscan.net/tx/${this.hash}`;
    },
  },

  mounted() {
    console.log(`App mounted`);
    this.getCaptcha();
  },
};
</script>

<template>
  <div class="container">
    <div class="faucetHeader">
      <span>eSpace Faucet</span>
    </div>
    <form class="faucet-form">
      <div>
        <input
          type="text"
          v-model="address"
          placeholder="Input your hex40 address"
        />
        &nbsp;
        <select v-model="coin">
          <option value="cfx">CFX</option>
          <option value="btc">BTC</option>
          <option value="eth">ETH</option>
          <option value="usdt">USDT</option>
          <option value="usdc">USDC</option>
        </select>
      </div>
      <div class="captcha2btn">
        <input type="text" v-model="captcha" placeholder="Input the captcha" />
        &nbsp;
        <img :src="captchaContent" width="100" @click="getCaptcha" />
        &nbsp;
        <button @click="getFaucet">
          <i v-if="claiming" class="fa fa-spinner fa-spin"></i> &nbsp; Claim
        </button>
      </div>
    </form>
    <div v-if="hash">
      <span><a :href="txScanLink">Check Transaction on ConfluxScan</a></span>
    </div>
    <div class="mt-10" style="color: #2c3e50">
      <ul>
        <li>One address can claim one kind eSpace testnet token per hour</li>
        <li>Click captcha image to refresh it</li>
        <li>
          Conflux Core Space faucet is at
          <a href="https://faucet.confluxnetwork.org/">here</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    /* display: grid; */
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}

.faucet-form input {
  width: 350px;
  height: 35px;
}

.faucet-form .captcha2btn {
  margin-top: 10px;
}

.faucet-form .captcha2btn input {
  width: 218px;
}

.faucet-form .captcha2btn input,
.faucet-form .captcha2btn img {
  vertical-align: middle;
}

.faucet-form select {
  width: 80px;
  height: 35px;
}

.faucet-form button {
  height: 35px;
  width: 100px;
}

.faucetHeader {
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}

.mt-10 {
  margin-top: 10px;
}
</style>
