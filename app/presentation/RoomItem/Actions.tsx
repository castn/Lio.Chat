import React from 'react';
import { Animated, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import I18n, { isRTL } from '../../i18n';
import styles, { ACTION_WIDTH, LONG_SWIPE } from './styles';
import { CustomIcon } from '../../lib/Icons';
import { themes } from '../../constants/colors';

interface ILeftActions {
	theme: string;
	transX: any;
	isRead: boolean;
	width: number;
	onToggleReadPress(): void;
}

interface IRightActions {
	theme: string;
	transX: any;
	favorite: boolean;
	width: number;
	toggleFav(): void;
	onHidePress(): void;
}

const reverse = new Animated.Value(isRTL() ? -1 : 1);

export const LeftActions = React.memo(({ theme, transX, isRead, width, onToggleReadPress }: ILeftActions) => {
	const translateX = Animated.multiply(
		transX.interpolate({
			inputRange: [0, ACTION_WIDTH],
			outputRange: [-ACTION_WIDTH, 0]
		}),
		reverse
	);
	return (
		<View style={[styles.actionsContainer, styles.actionLeftContainer]} pointerEvents='box-none'>
			<Animated.View
				style={[
					styles.actionLeftButtonContainer,
					{
						right: width - ACTION_WIDTH,
						width,
						transform: [{ translateX }],
						backgroundColor: themes[theme].tintColor
					}
				]}>
				<View style={styles.actionLeftButtonContainer}>
					<RectButton style={styles.actionButton} onPress={onToggleReadPress}>
						<>
							<CustomIcon size={20} name={isRead ? 'flag' : 'check'} color='white' />
							<Text style={[styles.actionText, { color: themes[theme].buttonText }]}>{I18n.t(isRead ? 'Unread' : 'Read')}</Text>
						</>
					</RectButton>
				</View>
			</Animated.View>
		</View>
	);
});

export const RightActions = React.memo(({ transX, favorite, width, toggleFav, onHidePress, theme }: IRightActions) => {
	const translateXFav = Animated.multiply(
		transX.interpolate({
			inputRange: [-width / 2, -ACTION_WIDTH * 2, 0],
			outputRange: [width / 2, width - ACTION_WIDTH * 2, width]
		}),
		reverse
	);
	const translateXHide = Animated.multiply(
		transX.interpolate({
			inputRange: [-width, -LONG_SWIPE, -ACTION_WIDTH * 2, 0],
			outputRange: [0, width - LONG_SWIPE, width - ACTION_WIDTH, width]
		}),
		reverse
	);
	return (
		<View
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				height: 75,
				flexDirection: 'row'
			}}
			pointerEvents='box-none'>
			<Animated.View
				style={[
					styles.actionRightButtonContainer,
					{
						width,
						transform: [{ translateX: translateXFav }],
						backgroundColor: themes[theme].hideBackground
					}
				]}>
				<RectButton style={[styles.actionButton, { backgroundColor: themes[theme].favoriteBackground }]} onPress={toggleFav}>
					<>
						<CustomIcon size={20} name={favorite ? 'star-filled' : 'star'} color={themes[theme].buttonText} />
						<Text style={[styles.actionText, { color: themes[theme].buttonText }]}>
							{I18n.t(favorite ? 'Unfavorite' : 'Favorite')}
						</Text>
					</>
				</RectButton>
			</Animated.View>
			<Animated.View
				style={[
					styles.actionRightButtonContainer,
					{
						width,
						transform: [{ translateX: translateXHide }]
					}
				]}>
				<RectButton style={[styles.actionButton, { backgroundColor: themes[theme].hideBackground }]} onPress={onHidePress}>
					<>
						<CustomIcon size={20} name='unread-on-top-disabled' color={themes[theme].buttonText} />
						<Text style={[styles.actionText, { color: themes[theme].buttonText }]}>{I18n.t('Hide')}</Text>
					</>
				</RectButton>
			</Animated.View>
		</View>
	);
});
