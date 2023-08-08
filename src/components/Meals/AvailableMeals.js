import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);

  useEffect(()=> {
    //func you pass to useEffect should not return a promise --async
    //May return a cleanup func which can be executed -- sync
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-food-order-ap-38de1-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      // below config done due to firebase response data structure
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      };
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, [])

    const mealsList = meals.map((meal) => (
      <MealItem
        id = {meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));

    return (
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    );

}

export default AvailableMeals;