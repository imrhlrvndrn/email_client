import { useState } from 'react';
import Search from '@/assets/svg/search.svg';
import Filter from '@/assets/svg/filter.svg';
import LightMode from '@/assets/svg/light.svg';
import DarkMode from '@/assets/svg/dark.svg';
import Options from '@/assets/svg/options.svg';
import {
    HeaderSearchWrapper,
    HeaderWrapper,
    HeaderQuickActionWrapper,
    HeaderQuickActions,
} from './header.styles';
import { useTheme } from '@/context/ThemeContext/theme.context';
import { HeaderQuickActionButton } from '../shared/Button/button.styles';

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const [isHeader, setIsHeader] = useState(true);

    const toggleTheme = () => setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));

    return (
        <HeaderWrapper>
            <div className='logo'>Outlook</div>
            <HeaderSearchWrapper>
                {/* svg search */}
                <Search width={22} height={22} />
                <input autoComplete='off' type='text' name='search' id='search' />
                {/* Filter dropdown */}
                <Filter width={22} height={22} />
            </HeaderSearchWrapper>
            <HeaderQuickActions>
                <HeaderQuickActionButton title='Meet Now'>
                    <Filter width={22} height={22} />
                </HeaderQuickActionButton>
                <HeaderQuickActionButton>
                    <Filter width={22} height={22} />
                </HeaderQuickActionButton>
                <HeaderQuickActionButton>
                    <Filter width={22} height={22} />
                </HeaderQuickActionButton>
                <HeaderQuickActionButton>
                    <Filter width={22} height={22} />
                </HeaderQuickActionButton>
                <HeaderQuickActionButton onClick={toggleTheme}>
                    {theme === 'light' ? (
                        <DarkMode width={22} height={22} />
                    ) : (
                        <LightMode width={22} height={22} />
                    )}
                </HeaderQuickActionButton>
            </HeaderQuickActions>
            <Options className='options_icon' width={22} height={22} />
        </HeaderWrapper>
    );
};
