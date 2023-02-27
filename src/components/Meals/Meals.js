import { Fragment } from "react";
import AvailibleMeals from "./AvailibleMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return <Fragment>
    <MealsSummary></MealsSummary>
    <AvailibleMeals></AvailibleMeals>
  </Fragment>;
};
export default Meals;
