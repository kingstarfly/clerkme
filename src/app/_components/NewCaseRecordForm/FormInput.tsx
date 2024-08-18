import type {
    FieldError,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form"

interface FormInputProps<T extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    id: Path<T>
    label: string
    register: UseFormRegister<T>
    error?: FieldError
    type?: string
}

export function FormInput<T extends FieldValues>({
    id,
    label,
    register,
    error,
    type = "text",
}: FormInputProps<T>) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                {...register(id)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    )
}
