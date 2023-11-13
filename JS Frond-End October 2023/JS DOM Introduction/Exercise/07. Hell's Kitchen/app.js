function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick() {
      let inputArray = JSON.parse(document.querySelector("textarea").value);
      const restaurants = {};

      inputArray.forEach(element => {
         let [restaurantName, workerData] = element.split(" - ");
         if (!restaurants.hasOwnProperty(restaurantName)) {
            createRestaurant(restaurants, restaurantName);
         };
         assignWorkers(restaurants, restaurantName, workerData);
         calcAverageSalary(restaurants, restaurantName);
         generateOutput(restaurants);
      });
   };

   function createRestaurant(restaurants, restaurantName) {
      restaurants[restaurantName] = {
         workers: [],
         averageSalary: 0,
         bestSalary: 0
      };
   };

   function assignWorkers(restaurants, restaurantName, workerData) {
      workerData = workerData.split(", ");
      workerData.forEach(data => {
         let [workerName, salary] = data.split(" ");
         salary = Number(salary)
         restaurants[restaurantName].workers.push({
            name: workerName,
            salary: salary
         });

         if (salary > restaurants[restaurantName].bestSalary) {
            restaurants[restaurantName].bestSalary = salary
         }

      })
   };

   function calcAverageSalary(restaurants, restaurantName) {
      let currentAverage = restaurants[restaurantName].workers.reduce((acc, curr) => {
         return acc += curr.salary / restaurants[restaurantName].workers.length
      }, 0);
      restaurants[restaurantName].averageSalary = currentAverage
   };

   function generateOutput(restaurants) {
      let bestRestaurant = Object.keys(restaurants)
         .sort((a, b) => restaurants[b].averageSalary - restaurants[a].averageSalary)[0];

      let restaurantInfo = `Name: ${bestRestaurant}`
         + ` Average Salary: ${(restaurants[bestRestaurant].averageSalary).toFixed(2)}`
         + ` Best Salary: ${(restaurants[bestRestaurant].bestSalary).toFixed(2)}`

      let workersInfo = restaurants[bestRestaurant].workers
         .sort((a, b) => b.salary - a.salary)
         .map(worker => {
            return `Name: ${worker.name} With Salary: ${worker.salary}`
         })
         .join(" ")

      document.querySelector("#bestRestaurant p").textContent = restaurantInfo
      document.querySelector("#workers p").textContent = workersInfo
   };

}