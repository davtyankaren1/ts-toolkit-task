import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { FoodsList } from './components/foods/FoodsList/FoodsList';
import { FoodForm } from './components/foods/FoodForm/FoodForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div>
      <ToastContainer theme="colored" closeButton={false} autoClose={500} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<FoodsList />} />
          <Route path="add" element={<FoodForm />} />
          <Route path="edit/:id" element={<FoodForm isEditForm={true} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
