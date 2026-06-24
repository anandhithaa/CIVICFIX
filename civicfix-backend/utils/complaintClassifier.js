function classifyComplaint(text = "", title = "") {
  const combined = `${title} ${text}`.toLowerCase();

  if (
    combined.includes("manhole") ||
    combined.includes("open drain") ||
    combined.includes("dangerous road") ||
    combined.includes("accident")
  ) {
    return {
      category: "Open Manhole",
      priority: "High",
      suggestedDepartment: "Road Maintenance Department"
    };
  }

  if (
    combined.includes("pothole") ||
    combined.includes("road broken") ||
    combined.includes("road damage")
  ) {
    return {
      category: "Pothole",
      priority: "High",
      suggestedDepartment: "Road Maintenance Department"
    };
  }

  if (
    combined.includes("garbage") ||
    combined.includes("trash") ||
    combined.includes("waste") ||
    combined.includes("dump")
  ) {
    return {
      category: "Garbage Overflow",
      priority: "Medium",
      suggestedDepartment: "Sanitation Department"
    };
  }

  if (
    combined.includes("streetlight") ||
    combined.includes("light not working") ||
    combined.includes("dark road")
  ) {
    return {
      category: "Broken Streetlight",
      priority: "Medium",
      suggestedDepartment: "Electrical Department"
    };
  }

  if (
    combined.includes("water leakage") ||
    combined.includes("pipe burst") ||
    combined.includes("water overflow")
  ) {
    return {
      category: "Water Leakage",
      priority: "Medium",
      suggestedDepartment: "Water Department"
    };
  }

  return {
    category: "Other",
    priority: "Low",
    suggestedDepartment: "General Civic Department"
  };
}

module.exports = classifyComplaint;