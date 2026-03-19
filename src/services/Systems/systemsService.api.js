// import axios from "axios";
import image360 from "~/assets/Systems/360.png";
import imageOne from "~/assets/Systems/One.png";
import imageAzure from "~/assets/Systems/Azure.png";
import Default from "~/assets/NoImg.png";

export async function getSystems() {
  // const response = await axios.get("url");
  // return response.data;
  return [
    {
      id: 1,
      name: "KinesiOS 360",
      version: "2.5.0",
      size: "125 MB",
      description: "Sistema para reabilitação motora e neurofuncional que utiliza o Kinect 360",
      categoryId: 1,
      imageUrl: image360
    },
    {
      id: 2,
      name: "KinesiOS One",
      version: "1.8.3",
      size: "85 MB",
      description: "Sistema para reabilitação motora e neurofuncional que utiliza o Kinect One",
      categoryId: 2,
      imageUrl: imageOne
    },
    {
      id: 3,
      name: "KinesiOS Azure",
      version: "3.2.1",
      size: "95 MB",
      description: "Sistema para reabilitação motora e neurofuncional que utiliza o Kinect Azure",
      categoryId: 2,
      imageUrl: imageAzure
    },
    {
      id: 4,
      name: "KinesiOS Balance",
      version: "1.4.0",
      size: "78 MB",
      description: "Sistema para treinamento de equilíbrio e coordenação motora com foco em exercícios terapêuticos",
      categoryId: 2,
      imageUrl: Default
    },
    {
      id: 5,
      name: "KinesiOS Clinic",
      version: "2.1.5",
      size: "140 MB",
      description: "Sistema de gestão clínica para acompanhamento de pacientes, sessões e evolução terapêutica",
      categoryId: 1,
      imageUrl: Default
    },
    {
      id: 6,
      name: "KinesiOS Mobility",
      version: "1.9.2",
      size: "92 MB",
      description: "Sistema voltado para exercícios de mobilidade articular e amplitude de movimento",
      categoryId: 2,
      imageUrl: Default
    },
    {
      id: 7,
      name: "KinesiOS Admin",
      version: "3.0.0",
      size: "110 MB",
      description: "Sistema administrativo para gerenciamento de usuários, permissões e unidades de atendimento",
      categoryId: 1,
      imageUrl: Default
    },
    {
      id: 8,
      name: "KinesiOS Sensor",
      version: "2.3.4",
      size: "88 MB",
      description: "Sistema para captura e análise de dados sensoriais aplicados à reabilitação motora",
      categoryId: 2,
      imageUrl: Default
    },
    {
      id: 9,
      name: "KinesiOS Reports",
      version: "1.7.1",
      size: "67 MB",
      description: "Sistema para emissão de relatórios clínicos, estatísticas de uso e desempenho dos pacientes",
      categoryId: 1,
      imageUrl: Default
    },
    {
      id: 10,
      name: "KinesiOS Neuro",
      version: "2.8.6",
      size: "101 MB",
      description: "Sistema focado em protocolos de reabilitação neurofuncional com acompanhamento interativo",
      categoryId: 2,
      imageUrl: Default
    },
    {
      id: 11,
      name: "KinesiOS Neuro",
      version: "2.8.6",
      size: "101 MB",
      description: "Sistema focado em protocolos de reabilitação neurofuncional com acompanhamento interativo",
      categoryId: 2,
      imageUrl: Default
    },
  ];
}

export async function getSystemCategories() {
  return [
    {
      id: 1,
      name: "Gestão",
    },
    {
      id: 2,
      name: "Outros",
    }
  ]
}