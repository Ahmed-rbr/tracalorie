class CalorieTracker {
  constructor() {
    this._caloriesLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._desplayCaloriesTotal();
    this._desplayCaloriesConsumed();
    this._desplayCalorieLimit();
    this._desplayCaloriesBurned();
    this._desplayCaloriesRemaining();
    this._desplayCaloriesProgress();
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
    calorieLimit.textContent = this._caloriesLimit;
  }
  _desplayCaloriesConsumed() {
    const caloriesConsumed = document.getElementById("calories-consumed");
    const totalConsumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumed.textContent = totalConsumed;
  }
  _desplayCaloriesBurned() {
    const caloriesBurned = document.getElementById("calories-burned");
    const totalBurend = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurned.textContent = totalBurend;
  }
  _desplayCaloriesRemaining() {
    const caloriesRemaining = document.getElementById("calories-remaining");
    const remaining = this._caloriesLimit - this._totalCalories;
    caloriesRemaining.textContent = remaining;

    const cardRemaining = caloriesRemaining.parentElement.parentElement;
    cardRemaining.classList.add(remaining > 0 ? "bg-light" : "bg-danger");
    cardRemaining.classList.remove(remaining > 0 ? "bg-danger" : "bg-light");
  }
  _desplayCaloriesProgress() {
    const progress = document.getElementById("calorie-progress");
    const progressWidth = (this._totalCalories / this._caloriesLimit) * 100;
    progress.style.width = progressWidth + "%";
    progress.textContent = Math.min(progressWidth, 100).toFixed(0) + "%";

    progress.classList.add(progressWidth >= 100 ? "bg-danger" : "bg-success");
    progress.classList.remove(
      progressWidth >= 100 ? "bg-success" : "bg-danger"
    );
  }
  _render() {
    this._desplayCaloriesTotal();
    this._desplayCaloriesConsumed();
    this._desplayCaloriesBurned();
    this._desplayCaloriesRemaining();
    this._desplayCaloriesProgress();
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

const meal1 = new Meal("tomat", 1git 000);
const workout1 = new Workout("jari", 320);
const meal2 = new Meal("batat", 750);

traker.addMeal(meal1);
traker.addMeal(meal2);

traker.addWorkout(workout1);
console.log(traker._totalCalories);
