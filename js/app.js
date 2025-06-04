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

    totalCalories.textContent = +this._totalCalories;
  }
  _desplayCalorieLimit() {
    const calorieLimit = document.getElementById("calories-limit");
    calorieLimit.textContent = +this._caloriesLimit;
  }
  _desplayCaloriesConsumed() {
    const caloriesConsumed = document.getElementById("calories-consumed");
    const totalConsumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumed.textContent = parseInt(totalConsumed);
  }
  _desplayCaloriesBurned() {
    const caloriesBurned = document.getElementById("calories-burned");
    const totalBurend = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurned.innerHTML = parseInt(totalBurend);
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
    const positivValue = Math.min(Math.max(progressWidth, 0), 100);
    progress.textContent = positivValue.toFixed(0) + "%";
    progress.style.width = positivValue.toFixed(0) + "%";

    progress.classList.remove("bg-success", "bg-danger");
    progress.classList.add(progressWidth >= 100 ? "bg-danger" : "bg-success");
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
class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .getElementById("meal-form")
      .addEventListener("submit", (e) => this._newItem(e, "meal"));

    document
      .getElementById("workout-form")
      .addEventListener("submit", (e) => this._newItem(e, "workout"));
  }
  _newItem(e, type) {
    e.preventDefault();

    const Form = document.getElementById(`${type}-form`);
    const name = document.getElementById(`${type}-name`).value;
    const calories = parseInt(
      document.getElementById(`${type}-calories`).value
    );
    if (name === "" || isNaN(calories) || !isNaN(name) || calories <= 0) {
      alert("Please fill in all information correctly.");
      return;
    }
    if (type === "meal") {
      const meal = new Meal(name, calories);

      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name, calories);

      this._tracker.addWorkout(workout);
    }

    Form.reset();
    const collapseMeal = document.getElementById(`collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseMeal, {
      toggle: true,
    });
  }
}

const app = new App();
