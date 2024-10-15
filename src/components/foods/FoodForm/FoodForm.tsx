import { useEffect, useRef, ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import * as actions from '../../../redux/features/foodsSlice';
import * as hooks from '../../../redux/hooks';
import * as types from '../../../types/Food.types';
import * as notify from '../../toastify/ToastConfig';
import styles from './FoodsForm.module.css';

type PropsTypes = {
  isEditForm?: boolean;
};

export const FoodForm = ({ isEditForm }: PropsTypes) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = hooks.useAppDispatch();
  const { createFoodStatus, updateFoodStatus } = hooks.useAppSelector(
    (state: RootState) => state.food,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: types.IFoodForm = { name, price, country };

    if (name && price && country) {
      if (isEditForm) {
        const updatedData: types.IUpdateUser = { id: userIdToEdit.current, data };
        dispatch(actions.UpdateFood(updatedData));
        dispatch(actions.GetFoods());
        navigate('/');
        notify.toastSuccess('UPDATED');
      } else {
        const data: types.IFoodForm = { name, price, country };
        dispatch(actions.PostFood(data));
        notify.toastSuccess('CREATED');
        dispatch(actions.GetFoods());
        navigate('/');
      }
    } else {
      notify.toastError('Required');
    }
  };

  const ResetFormData = () => {
    if (createFoodStatus === types.ApiStatus.success) {
      setName('');
      setCountry('');
      setPrice('');
      dispatch(actions.resetCreateFoodStatus());
      notify.toastInfo('Info cleaned');
    }
  };

  const params = useParams();
  const userIdToEdit = useRef(parseInt(params.id || ''));

  const { foods } = hooks.useAppSelector((state: RootState) => state.food);

  useEffect(() => {
    if (isEditForm && userIdToEdit.current) {
      // @ts-ignore
      const userData = foods.filter((x) => x.id === userIdToEdit.current);

      if (userData.length) {
        setName(userData[0].name);
        setPrice(userData[0].price);
        setCountry(userData[0].country);
      }
    }
  }, [isEditForm]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-control']}>
          <div>
            <input
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Name..."
              type="text"
              id="Name"
            />
          </div>
        </div>
        <div className={styles['form-control']}>
          <div>
            <input
              value={country}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
              placeholder="Country..."
              type="text"
              id="Country"
            />
          </div>
        </div>
        <div className={styles['form-control']}>
          {/* <label htmlFor="Price">Գին</label> */}
          <div>
            <input
              value={price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
              placeholder="Price..."
              type="text"
              id="Price"
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <div className={styles['button-control']}>
            <button
              type="submit"
              className={styles.addButton}
              disabled={
                createFoodStatus === types.ApiStatus.loading ||
                updateFoodStatus === types.ApiStatus.loading
              }>
              {isEditForm ? 'Update' : 'Create'}
            </button>
          </div>
          <div className={styles['button-control']}>
            <button onClick={ResetFormData} type="button" className={styles.addButton}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
