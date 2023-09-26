import {
  adminIcon,
  adminIcon2,
  brand,
  currenciesIcon,
  currenciesIcon2,
  customersIcon,
  customersIcon2,
  dashboardIcon,
  dashboardIcon2,
  faqIcon,
  faqIcon2,
  transactionIcon,
  transactionIcon2,
  settingsIcon,
  settingsIcon2
} from 'assets';
import { Box } from 'components';
import { Path } from 'navigations/routes';
import './aside.scss';
import LinkItem from './LinkItem';
import cs from 'classnames';

export interface LinkDataI {
  text: string;
  link: string;
  hoverImg: string;
  image: string;
}

interface Props {
  showAside: boolean;
}

const linkData: LinkDataI[] = [
  {
    text: 'Dashboard',
    link: Path.Dashboard,
    hoverImg: dashboardIcon2,
    image: dashboardIcon
  },
  {
    text: 'Transactions',
    hoverImg: transactionIcon2,
    image: transactionIcon,
    link: Path.Transactions
  },
  {
    text: 'Currencies',
    hoverImg: currenciesIcon2,
    image: currenciesIcon,
    link: Path.Currencies
  },
  {
    text: 'Customers',
    hoverImg: customersIcon2,
    image: customersIcon,
    link: Path.Customers
  },
  {
    text: 'Admin',
    hoverImg: adminIcon2,
    image: adminIcon,
    link: Path.Admin
  },
  {
    text: 'FAQ',
    hoverImg: faqIcon2,
    image: faqIcon,
    link: Path.FAQ
  },
  {
    text: 'Permissions',
    hoverImg: faqIcon2,
    image: faqIcon,
    link: Path.Permission
  },
  {
    text: 'Referral',
    hoverImg: faqIcon2,
    image: faqIcon,
    link: Path.Referral
  },
  {
    text: 'Settings',
    hoverImg: settingsIcon2,
    image: settingsIcon,
    link: Path.Settings
  }
];

const Aside: React.FC<Props> = ({ showAside }) => {
  const classes = cs('aside', {
    show: showAside
  });
  return (
    <Box className={classes} as="aside">
      <Box className="aside__brand">
        <Box className="aside__logo">
          <img src={brand} alt="logo" />
        </Box>
      </Box>
      <Box as="ul" className="aside__list">
        {linkData.map((item) => (
          <LinkItem item={item} key={item.text} />
        ))}
      </Box>
    </Box>
  );
};

export default Aside;
