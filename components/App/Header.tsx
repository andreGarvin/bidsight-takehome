import Link from 'next/link';

const Header = () => {
  const AppNameEnv = process.env.NEXT_PUBLIC_APP_NAME as string;
  const [AppName, ProductName] = AppNameEnv.split("-")

  return (
    <div className="bg-white pt-4 pb-2">
      <Link href="/">
        <span className="w-max flex flex-row justify-start items-end">
          <p className="text-4xl md:text-5xl font-bold capitalize mr-3">
            {AppName}
          </p>
          <p className="text-2xl md:text-3xl font-bold capitalize text-indigo-600">
            {ProductName}
          </p>
        </span>
      </Link>
    </div>
  );
};

export default Header;
