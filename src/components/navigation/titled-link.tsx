import { Link, LinkProps } from 'react-router-dom'
import { useTabs } from '../../providers/tab-provider'

export const TitledLink = (props: LinkProps & { title: string }) => {
  const [, dispatch] = useTabs()

  const openTab = () =>
    dispatch({
      type: 'linkClick',
      props: { title: props.title, url: props.to.toString() },
    })

  return <Link {...props} onClick={openTab} />
}
