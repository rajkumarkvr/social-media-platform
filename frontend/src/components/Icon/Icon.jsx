import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Icon = ({icon,className,id,onClick}) => {
  return <FontAwesomeIcon onClick={onClick} icon={icon} className={className} id={id} />
}

export default Icon