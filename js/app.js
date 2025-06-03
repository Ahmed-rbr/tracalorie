class CalorieTracker {
  constructor() {
    this._calorirLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._desplayCaloriesTotal();
    this._desplayCaloriesConsumed();
    this._desplayCalorieLimit();
    this._desplayCaloriesBurned();
    this._desplayCaloriesRemaining();
  }
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  _desplayCaloriesTotal() {
    const totalCalories = document.getElementById("calories-total");

    totalCalories.textContent = this._totalCalories;
  }
  _desplayCalorieLimit() {
    const calorieLimit = document.getElementById("calories-limit");
    calorieLimit.textContent = this._calorirLimit;
  }
  _desplayCaloriesConsumed() {
    const caloriesConsumed = document.getElementById("calories-consumed");
    const totalConsumed = this._meals.reduce((total, meal) => {
      return total + meal.calories;
    }, 0);
    caloriesConsumed.textContent = totalConsumed;
  }
  _desplayCaloriesBurned() {
    const caloriesBurned = document.getElementById("calories-burned");
    const totalBurend = this._workouts.reduce((total, workout) => {
      return total + workout.calories;
    }, 0);
    caloriesBurned.textContent = totalBurend;
  }
  _desplayCaloriesRemaining() {
    const caloriesRemaining = document.getElementById("calories-remaining");
    const remaining = this._calorirLimit - this._totalCalories;

    caloriesRemaining.textContent = remaining;
  }
  _render() {
    this._desplayCaloriesTotal();
    this._desplayCaloriesConsumed();
    this._desplayCalorieLimit();
    this._desplayCaloriesBurned();
    this._desplayCaloriesRemaining();
  }
}

class Meal {
  constructor(name, calories) {
    this.name = name;
    this.id = Math.random().toString(16).slice(2);
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.name = name;
    this.id = Math.random().toString(16).slice(2);
    this.calories = calories;
  }
}
const traker = new CalorieTracker();

const meal1 = new Meal("tomat", 100);
const workout1 = new Workout("jari", 200);
const meal2 = new Meal("batat", 200);

traker.addMeal(meal2);
traker.addMeal(meal2);
traker.addMeal(meal1);

traker.addWorkout(workout1);
console.log(traker._totalCalories);
