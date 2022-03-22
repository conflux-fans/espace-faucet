<script>
const URL = "http://localhost:3001/api/v1";
export default {
  data() {
    return {
      address: "",
      hash: "",
    };
  },

  methods: {
    getFaucet(e) {
      e.preventDefault();
      if (!this.address) {
        alert("Please enter an address");
        return;
      }
      fetch(`${URL}/faucet?address=${this.address}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.code) {
            alert("Claim failed!", data.message);
          } else {
            this.hash = data.hash;
            alert("Claimed success!");
          }
        })
        .catch((error) => {
          console.log("error", error);
          alert("Error: " + error);
        });
    },
  },

  mounted() {
    console.log(`App mounted`);
  },
};
</script>

<template>
  <div class="container">
    <div class="faucetHeader">
      <span>eSpace CFX Faucet</span>
    </div>
    <form class="address-form">
      <input
        type="text"
        v-model="address"
        placeholder="Input your hex40 address"
      />
      &nbsp;
      <button @click="getFaucet">Claim</button>
    </form>
    <div class="mt-10" style="color: #2c3e50">
      <p>One address can claim 100 testnet eSpace CFX per hour</p>
    </div>
    <div v-if="hash">
      <span>TX Hash: {{ hash }}</span>
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

.address-form input {
  width: 400px;
  height: 40px;
}

.address-form button {
  height: 40px;
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
