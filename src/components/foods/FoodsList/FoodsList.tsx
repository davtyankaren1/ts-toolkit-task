import { useEffect, useState } from 'react';
import { GetFoods, RemoveFood } from '../../../redux/features/foodsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ApiStatus, IFood } from '../../../types/Food.types';
import { BsEye } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { Modal } from '../../modal';
import { useNavigate } from 'react-router-dom';
import { toastInfo } from '../../toastify/ToastConfig';
import { Loading } from '../../loading/Loading';
import styles from './FoodsList.module.css';

export const FoodsList = () => {
  const [userDataToView, setUserDataToView] = useState<IFood | null>(null);

  const { foods, postFoodStatus } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetFoods());
  }, []);

  const deleting = (id: any) => {
    dispatch(RemoveFood(id));
    dispatch(GetFoods());
    toastInfo('Deleted');
  };

  return (
    <>
      <div className={styles.foods}>
        {postFoodStatus === ApiStatus.loading && (
          <div className={styles.loader}>
            <Loading />
          </div>
        )}
        {postFoodStatus === ApiStatus.error && <h6>Error while loading list</h6>}

        {postFoodStatus === ApiStatus.ideal &&
          foods?.map((food) => {
            return (
              <div key={food.id} className={styles.food}>
                <div className={styles['food_info']}>
                  <span>{food.name}</span>
                  <span>{food.country}</span>
                  <span>{food.price}$</span>
                </div>
                <div className={styles.actions}>
                  <div
                    onClick={() => {
                      setUserDataToView(food);
                    }}>
                    <BsEye />
                  </div>
                  <div
                    onClick={() => {
                      deleting(food.id);
                    }}>
                    <AiOutlineDelete />
                  </div>

                  <div
                    onClick={() => {
                      navigate(`/edit/${food.id}`);
                    }}>
                    <CiEdit />
                  </div>
                </div>
              </div>
            );
          })}

        {userDataToView && (
          <Modal
            title="More details"
            onClose={() => {
              setUserDataToView(null);
            }}>
            <div className={styles.info}>
              <div>
                <label>Name : {userDataToView.name}</label>
              </div>
              <div>
                <label>Price : {userDataToView.price}</label>
              </div>
              <div>
                <label>Country : {userDataToView.price}</label>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
