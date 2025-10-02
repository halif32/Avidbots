import React, { type ComponentType, type ReactNode } from 'react';
import FallbackComponent, {
	type Props as FallbackComponentProps,
} from './FallbackComponent';
import { AuthContext } from 'contexts/Auth';

export type Props = {
	children: Exclude<NonNullable<ReactNode>, string | number | boolean>
	FallbackComponent: ComponentType<FallbackComponentProps>
	onError?: (error: Error, stackTrace: string) => void
}

type State = { error: Error | null }

class ErrorBoundary extends React.Component<Props, State> {
	state: State = { error: null };
	static contextType = AuthContext;
	static defaultProps: {
		FallbackComponent: ComponentType<FallbackComponentProps>
	} = {
			FallbackComponent: FallbackComponent,
		};

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	componentDidCatch(error: Error, info: { componentStack: string }) {
		if (typeof this.props.onError === 'function') {
			// Here, we can use error reporting tool/service or send the logs to server.
			this.props.onError(error, info.componentStack);
		}
	}

	resetError: () => void = () => {
		this.setState({ error: null });
	};

	render() {
		const { signOut } = this.context;
		const { FallbackComponent } = this.props;
		if (this.state.error) { signOut(); }
		return this.state.error ? (
			<FallbackComponent
				error={this.state.error}
				resetError={this.resetError}
			/>
		) : (
			this.props.children
		);
	}
}

export default ErrorBoundary;