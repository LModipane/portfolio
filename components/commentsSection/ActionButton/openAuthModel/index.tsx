"use client"

const OpenAuthModel = () => {
  const openModel = () => { }

  return (
		<button
			type="button"
			onClick={openModel}
			className="rounded-xl bg-blue-600 px-5 py-2.5 text-[12px] md:text-sm font-semibold text-white transition hover:bg-blue-700 capitalize">
			send feedback
		</button>
	);
}

export default OpenAuthModel