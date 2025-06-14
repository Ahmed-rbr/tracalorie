class CalorieTracker {
  constructor() {
    this._caloriesLimit = Storeg.getCaloreLimite();
    this._totalCalories = Storeg.getTotalCalories();
    this._meals = Storeg.getMeals();
    this._workouts = Storeg.getWorkouts();
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
    Storeg.updateTotalCalories(this._totalCalories);
    Storeg.saveMeal(meal);
    this._displayMeal(meal);

    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storeg.updateTotalCalories(this._totalCalories);
    Storeg.saveWorkouts(workout);

    this._displayWorkout(workout);
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
    const totalBurend = this._workouts.reduce((total, workout) => {
      if (workout && typeof workout.calories === "number") {
        return total + workout.calories;
      }

      return total;
    }, 0);
    caloriesBurned.textContent = parseInt(totalBurend);
  }
  _desplayCaloriesRemaining() {
    const caloriesRemaining = document.getElementById("calories-remaining");
    const remaining = this._caloriesLimit - this._totalCalories;
    caloriesRemaining.textContent = remaining;

    const cardRemaining = caloriesRemaining.parentElement.parentElement;
    cardRemaining.classList.remove("bg-light", "bg-danger");
    cardRemaining.classList.add(remaining > 0 ? "bg-light" : "bg-danger");
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

  _displayMeal(meal) {
    const cards = document.querySelector("#meal-items");

    const card = document.createElement("div");
    card.classList.add("card", "my-2");
    card.dataset.id = meal.id;

    card.innerHTML = ` <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 dd bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
    cards.appendChild(card);
  }

  _displayWorkout(workout) {
    const cards = document.querySelector("#workout-items");

    const card = document.createElement("div");
    card.classList.add("card", "my-2");
    card.dataset.id = workout.id;
    card.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 dd bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
    cards.appendChild(card);
  }
  removeMeal(id) {
    const meal = this._meals.find((m) => m.id === id);
    if (meal) {
      this._totalCalories -= meal.calories;
      Storeg.updateTotalCalories(this._totalCalories);

      this._meals = this._meals.filter((m) => m.id !== id);
      Storeg.removeMeal(id);
    }
  }

  removeWorkout(id) {
    const workout = this._workouts.find((w) => w.id === id);
    if (workout) {
      this._totalCalories += workout.calories;
      Storeg.updateTotalCalories(this._totalCalories);

      this._workouts = this._workouts.filter((w) => w.id !== id);
      Storeg.removeWorkout(id);
    }
  }

  reset() {
    this._totalCalories = 0;
    this._meals.length = 0;
    this._workouts.length = 0;
    Storeg.clearAll();
    this._render();
  }
  _setLimit(newLimit) {
    this._caloriesLimit = newLimit;
    Storeg.setCaloreLimite(newLimit);
    this._desplayCalorieLimit();
    this._render();
  }

  loadItems() {
    this._meals.forEach((meal) => this._displayMeal(meal));
    this._workouts.forEach((workout) => this._displayWorkout(workout));
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

class Storeg {
  static getCaloreLimite(defaultLImit = 2000) {
    let caloriLimit;
    if (localStorage.getItem("caloriLimit") === null) {
      caloriLimit = defaultLImit;
    } else {
      caloriLimit = +localStorage.getItem("caloriLimit");
    }

    return caloriLimit;
  }

  static setCaloreLimite(calorieLimit) {
    localStorage.setItem("caloriLimit", calorieLimit);
  }

  static getTotalCalories(dfl = 0) {
    let totalCalories;

    if (localStorage.getItem("totalCalories") === null) {
      totalCalories = dfl;
    } else {
      totalCalories = +localStorage.getItem("totalCalories");
    }

    return totalCalories;
  }
  static updateTotalCalories(totalCalories) {
    localStorage.setItem("totalCalories", totalCalories);
  }

  static getMeals() {
    let meals;

    if (localStorage.getItem("meals") === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem("meals"));
    }

    return meals;
  }

  static saveMeal(meal) {
    if (!meal || typeof meal.calories !== "number") {
      console.error("Invalid meal data");
      return;
    }
    const meals = Storeg.getMeals();
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static getWorkouts() {
    let workouts;

    if (localStorage.getItem("workouts") === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem("workouts"));
    }

    return workouts;
  }

  static saveWorkouts(workout) {
    if (!workout || typeof workout.calories !== "number") {
      console.error("Invalid workout data");
      return;
    }
    const workouts = Storeg.getWorkouts();
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static removeMeal(id) {
    let meals = Storeg.getMeals();

    meals = meals.filter((meal) => meal.id !== id);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static removeWorkout(id) {
    let workouts = Storeg.getMeals();

    workouts = workouts.filter((workout) => workout.id !== id);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static clearAll() {
    localStorage.removeItem("workouts");
    localStorage.removeItem("meals");
    localStorage.removeItem("caloriLimit");
    localStorage.removeItem("totalCalories");
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._loadEventListeners();
    this._tracker.loadItems();
  }
  _loadEventListeners() {
    document
      .getElementById("meal-form")
      .addEventListener("submit", (e) => this._newItem(e, "meal"));

    document
      .getElementById("workout-form")
      .addEventListener("submit", (e) => this._newItem(e, "workout"));
    document
      .getElementById("workout-items")
      .addEventListener("click", (e) => this._removeItem(e, "workout"));
    document
      .getElementById("meal-items")
      .addEventListener("click", (e) => this._removeItem(e, "meal"));

    document
      .querySelector("#filter-meals")
      .addEventListener("keyup", this._filteritems.bind(this, "meal"));
    document
      .querySelector("#filter-workouts")
      .addEventListener("keyup", this._filteritems.bind(this, "workout"));

    document
      .querySelector("#reset")
      .addEventListener("click", this._reset.bind(this));
    document
      .querySelector("#limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
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

  _removeItem(e, type) {
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      if (confirm("are you sure?")) {
        const id = e.target.closest(".card").getAttribute("data-id");
        const card = e.target.closest(".card");

        type === "meal"
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);
        card.remove();
        this._tracker._render();
      }
    }
  }

  _filteritems(type) {
    const inputSearch = document
      .querySelector(`#filter-${type}s`)
      .value.toLowerCase()
      .trim();
    const items = document.querySelector(`#${type}-items`);
    const cards = items.querySelectorAll(".card");
    if (items.children.length === 0) {
      alert("no items to search");
      return;
    }
    cards.forEach((card) => {
      const cardName = card
        .querySelector("h4")
        .textContent.toLowerCase()
        .trim();
      if (cardName.includes(inputSearch)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  _reset() {
    if (confirm("are you sure...?")) {
      this._tracker.reset();
      document.querySelector("#workout-items").innerHTML = "";
      document.querySelector("#meal-items").innerHTML = "";
      document.querySelector("#calories-limit").innerHTML =
        Storeg.getCaloreLimite();
      document.querySelector("#calories-remaining").innerHTML =
        Storeg.getCaloreLimite();
    }
  }
  _setLimit(e) {
    e.preventDefault();
    let newLimit = document.getElementById("limit");
    if (isNaN(newLimit.value) || newLimit.value <= 0) {
      alert("Please fill in all information correctly.");
      return;
    }

    this._tracker._setLimit(parseInt(newLimit.value));
    newLimit.value = "";
    const modelEl = document.getElementById("limit-modal");

    const modal = bootstrap.Modal.getInstance(modelEl);
    modal.hide();
  }
}

const app = new App();
