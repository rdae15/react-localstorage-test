
export const Container = ({ children }) => {
	return (
		<div className="container p-4">
			<div className="col-md-6 offset-md-4">
				{children}
			</div>
		</div>
	)
}