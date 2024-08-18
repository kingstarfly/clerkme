import type {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";

interface FormTextAreaProps<T extends FieldValues>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  rows?: number;
}

export function FormTextArea<T extends FieldValues>({
  id,
  label,
  register,
  error,
  rows = 3,
}: FormTextAreaProps<T>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        {...register(id)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {error?.message !== undefined && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
}
