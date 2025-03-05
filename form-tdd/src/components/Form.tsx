import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Informe um email válido"),
  password: z.string().min(8, "A senha deve possuir pelo menos 8 caracteres"),
});

type FormType = z.infer<typeof formSchema>;

type Props = {
  submitForm: (data: FormType) => void;
};

export const Form = ({ submitForm }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    mode: "all",
    resolver: zodResolver(formSchema),
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        reset();
        submitForm(data);
      })}
    >
      <input
        {...register("email")}
        aria-label="email"
        type="email"
        placeholder="email"
      />
      <span style={{ color: "red" }}>{errors.email?.message ?? ""}</span>
      <input
        {...register("password")}
        aria-label="password"
        type="text"
        placeholder="password"
      />
      {errors.password && (
        <span style={{ color: "red" }}>{errors.password?.message ?? ""}</span>
      )}
      <button>send</button>
    </form>
  );
};
