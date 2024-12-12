type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
};

const Button = (props: Props) => {
    return (
        <button
            {...props}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 my-3"
        >
            {props.label}
        </button>
    );
};

export default Button;
