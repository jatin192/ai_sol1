interface NetworkBadgeProps {
  network: string;
}

const NetworkBadge = ({ network }: NetworkBadgeProps) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white border border-white/10 shadow-lg shadow-blue-500/20 backdrop-blur-sm">
        <span className="bg-gradient-to-r from-blue-200 via-white to-blue-200 text-transparent bg-clip-text">
          {network}
        </span>
      </div>
    </div>
  );
};

export default NetworkBadge;
