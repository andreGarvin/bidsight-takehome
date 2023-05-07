import {
  BsList,
  BsCheckLg,
  BsGridFill,
  BsCaretDownFill,
  BsQuestionSquareFill,
  BsFillCalendarEventFill,
} from "react-icons/bs";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp
} from "react-icons/hi";
import {
  FaCheckCircle,
  FaChevronDown,
  FaArrowRight,
  FaChevronUp,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { IoIosCloseCircle, IoIosMore, IoMdTrash } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";

const UpDownChevron = () => (
  <span className="flex flex-col items-center">
    <HiOutlineChevronUp />
    <HiOutlineChevronDown />
  </span>
);

const Icons = {
  List: <BsList />,
  Grid: <BsGridFill />,
  Check: <BsCheckLg />,
  Calendar: <BsFillCalendarEventFill />,
  CaretDown: <BsCaretDownFill />,
  MoreVertical: <FiMoreVertical />,
  Pencil: <RiPencilFill />,
  More: <IoIosMore />,
  Trash: <IoMdTrash />,
  Hint: <BsQuestionSquareFill />,
  ChevronDown: <FaChevronDown />,
  ChevronUp: <FaChevronUp />,
  ArrowRight: <FaArrowRight />,
  SearchGlass: <FaSearch />,
  CloseCirle: <IoIosCloseCircle />,
  CloseOutline: <GrClose />,
  Plus: <FaPlus />,
  CheckCircle: <FaCheckCircle />,
  Point: <TbPointFilled />,
  UpDownChevron: <UpDownChevron />,
};

export type IconType = keyof typeof Icons;

type IconProps = {
  className?: string;
  as: IconType;
};

export const Icon: React.FC<IconProps> = (props) => {
  const { as, className } = props;

  const IconComponent = Icons[as];
  return <IconComponent.type className={className} />;
};
