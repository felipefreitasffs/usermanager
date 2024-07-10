const customTheme = {
  drawer: {
    defaultProps: {
      size: 300,
      overlay: true,
      placement: "left",
      overlayProps: undefined,
      className: "",
      dismiss: undefined,
      onClose: undefined,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    styles: {
      base: {
        drawer: {
          position: "absolute",
          zIndex: "z-[9999]",
          pointerEvents: "pointer-events-auto",
          backgroundColor: "bg-myBlue",
          boxSizing: "box-border",
          width: "w-full",
          boxShadow: "shadow-2xl shadow-blue-gray-900/10",
        },
        overlay: {
          position: "absolute",
          inset: "inset-0",
          width: "w-full",
          height: "h-full",
          pointerEvents: "pointer-events-auto",
          zIndex: "z-[9995]",
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-60",
          backdropBlur: "backdrop-blur-sm",
        },
      },
    },
  },
  list: {
    defaultProps: {
      ripple: true,
      className: "",
    },
    styles: {
      base: {
        list: {
          display: "flex",
          flexDirection: "flex-col",
          gap: "gap-1",
          minWidth: "min-w-[240px]",
          p: "p-2",
          fontFamily: "font-sans",
          fontSize: "text-base",
          fontWeight: "font-normal",
          color: "text-blue-gray-50",
        },
        item: {
          initial: {
            display: "flex",
            alignItems: "items-center",
            width: "w-full",
            padding: "p-3",
            borderRadius: "rounded-lg",
            textAlign: "text-start",
            lightHeight: "leading-tight",
            transition: "transition-all",
            bg: "hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80",
            color:
              "hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900",
            outline: "outline-none",
          },
          selected: {
            bg: "bg-blue-gray-50/50",
            color: "text-blue-gray-700",
          },
          disabled: {
            opacity: "opacity-50",
            cursor: "cursor-not-allowed",
            pointerEvents: "pointer-events-none",
            userSelect: "select-none",
            bg: "hover:bg-transparent focus:bg-transparent active:bg-transparent",
            color:
              "hover:text-blue-gray-500 focus:text-blue-gray-500 active:text-blue-gray-500",
          },
        },
        itemPrefix: {
          display: "grid",
          placeItems: "place-items-center",
          marginRight: "mr-4",
        },
        itemSuffix: {
          display: "grid",
          placeItems: "place-items-center",
          marginRight: "ml-auto justify-self-end",
        },
      },
    },
  },
  alert: {
    defaultProps: {
      variant: "filled",
      color: "blue",
      icon: undefined,
      open: true,
      action: undefined,
      onClose: undefined,
      animate: {
        unmount: {},
        mount: {},
      },
      className: "",
    },
    valid: {
      variants: ["filled", "gradient", "outlined", "ghost"],
      colors: [
        "blue-gray",
        "gray",
        "brown",
        "deep-orange",
        "orange",
        "amber",
        "yellow",
        "lime",
        "light-green",
        "green",
        "teal",
        "cyan",
        "light-blue",
        "blue",
        "indigo",
        "deep-purple",
        "purple",
        "pink",
        "red",
      ],
    },
    styles: {
      base: {
        alert: {
          position: "absolute",
          display: "block",
          width: "w-3/10",
          fontFamily: "font-sans",
          fontSize: "text-base",
          fontWeight: "font-regular",
          px: "px-4",
          py: "py-4",
          borderRadius: "rounded-lg",
        },
        action: {
          position: "!absolute",
          top: "top-3",
          right: "right-3",
        },
      },
      variants: {
        filled: {
          "blue-gray": {
            backgroud: "bg-blue-gray-500",
            color: "text-white",
          },
          gray: {
            backgroud: "bg-gray-500",
            color: "text-white",
          },
          brown: {
            backgroud: "bg-brown-500",
            color: "text-white",
          },
          "deep-orange": {
            backgroud: "bg-deep-orange-500",
            color: "text-white",
          },
          orange: {
            backgroud: "bg-orange-500",
            color: "text-white",
          },
          amber: {
            backgroud: "bg-amber-500",
            color: "text-black",
          },
          yellow: {
            backgroud: "bg-yellow-500",
            color: "text-black",
          },
          lime: {
            backgroud: "bg-lime-500",
            color: "text-black",
          },
          "light-green": {
            backgroud: "bg-light-green-500",
            color: "text-white",
          },
          green: {
            backgroud: "bg-green-500",
            color: "text-white",
          },
          teal: {
            backgroud: "bg-teal-500",
            color: "text-white",
          },
          cyan: {
            backgroud: "bg-cyan-500",
            color: "text-white",
          },
          "light-blue": {
            backgroud: "bg-light-blue-500",
            color: "text-white",
          },
          blue: {
            backgroud: "bg-blue-500",
            color: "text-white",
          },
          indigo: {
            backgroud: "bg-indigo-500",
            color: "text-white",
          },
          "deep-purple": {
            backgroud: "bg-deep-purple-500",
            color: "text-white",
          },
          purple: {
            backgroud: "bg-purple-500",
            color: "text-white",
          },
          pink: {
            backgroud: "bg-pink-500",
            color: "text-white",
          },
          red: {
            backgroud: "bg-red-500",
            color: "text-white",
          },
        },
        gradient: {
          "blue-gray": {
            backgroud: "bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400",
            color: "text-white",
          },
          gray: {
            backgroud: "bg-gradient-to-tr from-gray-600 to-gray-400",
            color: "text-white",
          },
          brown: {
            backgroud: "bg-gradient-to-tr from-brown-600 to-brown-400",
            color: "text-white",
          },
          "deep-orange": {
            backgroud:
              "bg-gradient-to-tr from-deep-orange-600 to-deep-orange-400",
            color: "text-white",
          },
          orange: {
            backgroud: "bg-gradient-to-tr from-orange-600 to-orange-400",
            color: "text-white",
          },
          amber: {
            backgroud: "bg-gradient-to-tr from-amber-600 to-amber-400",
            color: "text-black",
          },
          yellow: {
            backgroud: "bg-gradient-to-tr from-yellow-600 to-yellow-400",
            color: "text-black",
          },
          lime: {
            backgroud: "bg-gradient-to-tr from-lime-600 to-lime-400",
            color: "text-black",
          },
          "light-green": {
            backgroud:
              "bg-gradient-to-tr from-light-green-600 to-light-green-400",
            color: "text-white",
          },
          green: {
            backgroud: "bg-gradient-to-tr from-green-600 to-green-400",
            color: "text-white",
          },
          teal: {
            backgroud: "bg-gradient-to-tr from-teal-600 to-teal-400",
            color: "text-white",
          },
          cyan: {
            backgroud: "bg-gradient-to-tr from-cyan-600 to-cyan-400",
            color: "text-white",
          },
          "light-blue": {
            backgroud:
              "bg-gradient-to-tr from-light-blue-600 to-light-blue-400",
            color: "text-white",
          },
          blue: {
            backgroud: "bg-gradient-to-tr from-blue-600 to-blue-400",
            color: "text-white",
          },
          indigo: {
            backgroud: "bg-gradient-to-tr from-indigo-600 to-indigo-400",
            color: "text-white",
          },
          "deep-purple": {
            backgroud:
              "bg-gradient-to-tr from-deep-purple-600 to-deep-purple-400",
            color: "text-white",
          },
          purple: {
            backgroud: "bg-gradient-to-tr from-purple-600 to-purple-400",
            color: "text-white",
          },
          pink: {
            backgroud: "bg-gradient-to-tr from-pink-600 to-pink-400",
            color: "text-white",
          },
          red: {
            backgroud: "bg-gradient-to-tr from-red-600 to-red-400",
            color: "text-white",
          },
        },
        outlined: {
          "blue-gray": {
            border: "border border-blue-gray-500",
            color: "text-blue-gray-700",
          },
          gray: {
            border: "border border-gray-500",
            color: "text-gray-700",
          },
          brown: {
            border: "border border-brown-500",
            color: "text-brown-700",
          },
          "deep-orange": {
            border: "border border-deep-orange-500",
            color: "text-deep-orange-700",
          },
          orange: {
            border: "border border-orange-500",
            color: "text-orange-700",
          },
          amber: {
            border: "border border-amber-500",
            color: "text-amber-700",
          },
          yellow: {
            border: "border border-yellow-500",
            color: "text-yellow-700",
          },
          lime: {
            border: "border border-lime-500",
            color: "text-lime-700",
          },
          "light-green": {
            border: "border border-light-green-500",
            color: "text-light-green-700",
          },
          green: {
            border: "border border-green-500",
            color: "text-green-700",
          },
          teal: {
            border: "border border-teal-500",
            color: "text-teal-700",
          },
          cyan: {
            border: "border border-cyan-500",
            color: "text-cyan-700",
          },
          "light-blue": {
            border: "border border-light-blue-500",
            color: "text-light-blue-700",
          },
          blue: {
            border: "border border-blue-500",
            color: "text-blue-700",
          },
          indigo: {
            border: "border border-indigo-500",
            color: "text-indigo-700",
          },
          "deep-purple": {
            border: "border border-deep-purple-500",
            color: "text-deep-purple-700",
          },
          purple: {
            border: "border border-purple-500",
            color: "text-purple-700",
          },
          pink: {
            border: "border border-pink-500",
            color: "text-pink-700",
          },
          red: {
            border: "border border-red-500",
            color: "text-red-700",
          },
        },
        ghost: {
          "blue-gray": {
            backgroud: "bg-blue-gray-500/20",
            color: "text-blue-gray-900",
          },
          gray: {
            backgroud: "bg-gray-500/20",
            color: "text-gray-900",
          },
          brown: {
            backgroud: "bg-brown-500/20",
            color: "text-brown-900",
          },
          "deep-orange": {
            backgroud: "bg-deep-orange-500/20",
            color: "text-deep-orange-900",
          },
          orange: {
            backgroud: "bg-orange-500/20",
            color: "text-orange-900",
          },
          amber: {
            backgroud: "bg-amber-500/20",
            color: "text-amber-900",
          },
          yellow: {
            backgroud: "bg-yellow-500/20",
            color: "text-yellow-900",
          },
          lime: {
            backgroud: "bg-lime-500/20",
            color: "text-lime-900",
          },
          "light-green": {
            backgroud: "bg-light-green-500/20",
            color: "text-light-green-900",
          },
          green: {
            backgroud: "bg-green-500/20",
            color: "text-green-900",
          },
          teal: {
            backgroud: "bg-teal-500/20",
            color: "text-teal-900",
          },
          cyan: {
            backgroud: "bg-cyan-500/20",
            color: "text-cyan-900",
          },
          "light-blue": {
            backgroud: "bg-light-blue-500/20",
            color: "text-light-blue-900",
          },
          blue: {
            backgroud: "bg-blue-500/20",
            color: "text-blue-900",
          },
          indigo: {
            backgroud: "bg-indigo-500/20",
            color: "text-indigo-900",
          },
          "deep-purple": {
            backgroud: "bg-deep-purple-500/20",
            color: "text-deep-purple-900",
          },
          purple: {
            backgroud: "bg-purple-500/20",
            color: "text-purple-900",
          },
          pink: {
            backgroud: "bg-pink-500/20",
            color: "text-pink-900",
          },
          red: {
            backgroud: "bg-red-500/20",
            color: "text-red-900",
          },
        },
      },
    },
  },
};

export default customTheme;
