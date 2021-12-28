<template>
    <div class= "flex justify-center border-4 rounded-2xl pt-16 pl-6 pr-6 pb-16 max-w-lg shadow-md ml-10 mr-10 bg-yellow-100">
      <label class= " h-4 font-black text-3xl" id = "counter" > {{counter}}</label>
      <button class = "bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded shadow ml-28 mr-2" id="decrementBTN" @click="counting('Down')" type="button"> 
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />
        </svg>
      </button>
      <button class = "bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded shadow ml-4 mr-2" id="incrementBTN" @click="counting('Up')" type = "button">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      <button class = "bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded shadow ml-4 mr-4" type = "button" id="resetBTN" @click="reset()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
  </div>
</template>

<script>
import CounterClient from ".././src/CounterClient.js";
const client = new CounterClient("http://127.0.0.1:5000")
export default {
     data()
    {
        return {
          counter: 0
        }
    },
    methods:
    {
        animate_counter_bouncy(direction)
        {
            //counting bounce animation
            let counter = document.getElementById('counter');
            let start = "translate(0,0)", top = "translate(0,-100px)",bot= "translate(0,100px)";
            let time = 300;
            let anim = {}
            switch(direction)
            {
              case "Down":
                anim.transform = [start,bot,start]
                break;
              case "Up":
                anim.transform = [start,top,start]
            }
            counter.animate(anim,time);
        },
        async counting(direction)
        {
          switch(direction)
          {
            case "Down":
              //this.counter-=1;
              this.counter = await client.decreaseCounter().then(r => r.value);
              break;
            case "Up":
             // this.counter +=1;
             this.counter = await client.increaseCounter().then(r => r.value);
              break;
          }
          this.animate_counter_bouncy(direction);
        },
        async reset()
        {
          this.counter = await client.resetCounter().then(r => r.value);
          // this.counter = await client.resetCounter();
        }
    },
    async mounted()
    {
      this.counter= await client.getCounter().then(r => r.value)
     
    }
}
</script>