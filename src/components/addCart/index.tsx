import { ShoppingCartIcon } from '@heroicons/react/outline';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { cartSet } from '../../utils/orderUtils';

export function AddCart({ product, user, exchangeRate }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = useCallback(async (data) => {
    //   재고 확인 후 업데이트 함수 실행
    cartSet(user, product, data.qty, exchangeRate);
    reset();
    return;
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <div className="flex flex-row">
        <input
          {...register('qty', {
            required: { value: true, message: 'Required.' },
            maxLength: { value: 5, message: 'Too long.' },
            minLength: { value: 1, message: 'Too short.' },
            valueAsNumber: true
          })}
          type="number"
          className="border outline-none w-full"
        />
        <ShoppingCartIcon type="submit" className="h-5" />
      </div>
      <ErrorMessage
        errors={errors}
        name="qty"
        render={({ message }) => (
          <div className="text-center font-semibold w-full text-red-600 mb-1">{message}</div>
        )}
      />
    </form>
  );
}