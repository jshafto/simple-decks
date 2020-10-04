import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



import { loadCategoriesThunk, clearCategories } from '../store/categories';


const CategoryButtons = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.entities.categories.byId)



  useEffect(() => {
    dispatch(loadCategoriesThunk());
    return () => dispatch(clearCategories());
  }, [dispatch])



  return (
    <Tabs
      value={(categoryId) ? parseInt(categoryId): 0}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto">
        <Tab value={0} label="View All" component={NavLink} to={`/browse`} />
      {Object.values(categories).map((cat) => (
        <Tab value={cat.id} label={cat.label} key={cat.id} component={NavLink} to={`/categories/${cat.id}`} />
      ))}
    </Tabs>
  )
}

export default CategoryButtons;
