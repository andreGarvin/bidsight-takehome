const Footer = () => {
  const AppName = `${process.env.NEXT_PUBLIC_APP_NAME}-${process.env.NODE_ENV}`;

  return (
    <div className="h-max flex justify-end py-2 px-4">
      <p className="text-gray-500">@ {new Date().getFullYear()} {AppName}</p>
    </div>
  );
};

export default Footer;
