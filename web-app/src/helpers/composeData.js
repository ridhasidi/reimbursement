export const composeData = (input) => {
  let result = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };
  let temp = {};
  input.forEach((element) => {
    if (!temp[element.Status.name]) {
      temp[element.Status.name] = 0;
    }
    temp[element.Status.name] += element.amount;
  });
  result.labels = Object.keys(temp);
  result.datasets[0].data = Object.values(temp);
  result.labels.forEach((element) => {
    if (element === "Rejected") {
      result.datasets[0].backgroundColor.push("#f43f5e");
    } else if (element === "Completed") {
      result.datasets[0].backgroundColor.push("#22c55e");
    } else if (element === "Submitted") {
      result.datasets[0].backgroundColor.push("#3b82f6");
    } else {
      result.datasets[0].backgroundColor.push("#fcd34d");
    }
  });
  return result;
};

export const composeData2 = (input) => {
  let labels = [];
  let datasets = [];

  let temp = {};
  input.forEach((element) => {
    if (!temp[element.User.name]) {
      temp[element.User.name] = true;
    }
  });
  labels = Object.keys(temp);
  let temp2 = {};
  input.forEach((element) => {
    if (!temp2[element.Status.name]) {
      temp2[element.Status.name] = {};
    }
    if (!temp2[element.Status.name][element.User.name]) {
      temp2[element.Status.name][element.User.name] = 0;
    }
    temp2[element.Status.name][element.User.name] += element.amount;
  });
  let keys = Object.keys(temp2);
  let values = Object.values(temp2);
  for (let i = 0; i < keys.length; i++) {
    let obj = {
      label: "",
      data: [],
      backgroundColor: "",
    };
    obj.label = keys[i];
    for (let j = 0; j < labels.length; j++) {
      if (values[i][labels[j]]) {
        obj.data.push(values[i][labels[j]]);
      } else {
        obj.data.push(0);
      }
    }
    if (obj.label === "Rejected") {
      obj.backgroundColor = "#f43f5e";
    } else if (obj.label === "Completed") {
      obj.backgroundColor = "#22c55e";
    } else if (obj.label === "Submitted") {
      obj.backgroundColor = "#3b82f6";
    } else {
      obj.backgroundColor = "#fcd34d";
    }
    datasets.push(obj);
  }

  return { labels, datasets };
};

export const options = {
  plugins: {
    title: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
